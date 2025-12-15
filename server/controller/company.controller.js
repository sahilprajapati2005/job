import Company from "../models/compony.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registercompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Please provide company name", success: false });
        }
        
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ message: "You can't register the same company", success: false });
        }
        
        company = await Company.create({
            name: companyName,
            userId: req.id, 
        });
        
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        console.error("Error in company registration:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        
        if (!companies) {
            return res.status(404).json({ message: "Companies not found.", success: false });
        }
        
        return res.status(200).json({ companies, success: true });
    } catch (error) {
        console.error("Error in fetching company:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        
        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false });
        }
        
        return res.status(200).json({ company, success: true });
    } catch (error) {
        console.error("Error in fetching company by ID:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        // Cloudinary Upload for Logo
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "image", // Logos are usually images
                folder: "career_portal_logos" // Folder name in Cloudinary
            });
        }

        const updateData = { name, description, website, location };
        
        if (cloudResponse) {
            updateData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error in updating company:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};