import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({error: "Unauthorized: No Token Provided."});
        
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET)
        if(!decodedToken) return res.status(401).json({error: "Unauthorized: Invalid Token Provided."});
        const user = await User.findById(decodedToken.userId);
        if(!user) return res.status(401).json({error: "Unauthorized: User was not found."})
        
        req.user = user;
        next()
    
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in protectRoute: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}