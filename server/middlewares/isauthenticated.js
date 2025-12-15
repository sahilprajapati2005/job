import jwt from "jsonwebtoken";

const isauthenticated = async (req, res,next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    req.user = decoded;
    req.id = decoded.userId; // Assuming userId is stored in the token
    
   
    next();
  } catch (error) {
    console.error("Error in authentication ", error);
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};
export default isauthenticated;
