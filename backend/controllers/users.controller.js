import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in getAllUser controller: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({error: "User not found"});
        return res.status(200).json(user)
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in getUserById controller: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}