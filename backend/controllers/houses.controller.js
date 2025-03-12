import { House } from "../models/home.model.js";
import { User } from "../models/user.model.js";

export const getAllHouses = async (req, res) => {
    try{
        const houses = await House.find();
        console.log("HOUSES: ", houses);
        return res.status(200).json(houses)
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in getAllHouses controller: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}

export const getHouseById = async (req, res) => {
    try {
        const { id } = req.params
        console.log("ID:", id)
        if(!id) return res.status(400).json({error: "Error: No houseId provided"})
        const house = await House.findById(id)
        if(!house) return res.status(404).json({error: "House with such id was not found"})
        return res.status(200).json(house)
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in getHouseById controller: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}

export const likeUnlikeHouse = async(req, res) => {
    try {
        const { houseId } = req.params;
        const { id: userId } = req.user;

        if(!houseId || !userId) return res.status(400).json({error: "UserId or HouseId  not provided"});

        const house = await House.findById(houseId);
        if(!house) return res.status(404).json({error: "House not found"});

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error: "User not found"});

        if(user.liked.includes(houseId.toString())){
            // UNLIKE
            await User.findByIdAndUpdate(userId, { $pull: {liked: houseId.toString()}});
            return res.status(200).json({message: "House unliked successfully"})
        }else{
            // LIKE
            await User.findByIdAndUpdate(userId, { $push: { liked: houseId.toString()}});
            return res.status(200).json({message: "House liked successfully"})
        }

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in likeUnlikeHouse controller: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}