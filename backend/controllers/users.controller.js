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
        const user = await User.findById(id).populate({path: "liked", model: "House"});
        if(!user) return res.status(404).json({error: "User not found"});
        return res.status(200).json(user)
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in getUserById controller: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}


export const userUpdate = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { name, email, avatar } = req.body;

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error: "User not found"});
        
        if(email !== user.email){
            // IF USER CHANGES EMAIL, CHECK IF IT IS ALREADY TAKEN
            const takenUser = await User.findOne({email});
            if(takenUser) return res.status(400).json({error: "User with this email already exists"});
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.avatar = avatar || user.avatar;

        await user.save()
        return res.status(200).json(user);
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in userUpdate controller: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}