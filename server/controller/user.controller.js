import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }
        
        const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already exists.", success: false });
            }
            if (existingUser.phoneNumber === phoneNumber) {
                return res.status(400).json({ message: "Phone number already exists.", success: false });
            }
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
        });
        
        return res.status(201).json({ message: "Account created successfully", success: true });
    } catch (error) {
        console.error("Error in user registration:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect email or password", success: false });
        }

        if (foundUser.role !== role) {
            return res.status(403).json({ message: "Account does not exist with current role", success: false });
        }

        const tokenData = { userId: foundUser._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        const userData = {
            _id: foundUser._id,
            fullname: foundUser.fullname,
            email: foundUser.email,
            phoneNumber: foundUser.phoneNumber,
            role: foundUser.role,
            profile: foundUser.profile,
        };

        return res.status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, sameSite: "strict", httpOnly: true })
            .json({ message: `Welcome back ${foundUser.fullname}`, user: userData, success: true });
    } catch (error) {
        console.error("Error in user login:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // Cloudinary Upload for Resume
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw", // Required for non-image files like PDFs
                folder: "career_portal_resumes" // Folder name in Cloudinary
            });
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; 
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Save resume URL and original name
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginamName = file.originalname; 
        }

        await user.save();

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: userResponse,
            success: true
        });
    } catch (error) {
        console.error("Error in updating profile:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};