import { House } from "../models/home.model.js";

export const getAllHouses = async (req, res) => {
    try{
        const houses = await House.find();
        console.log("HOUSES: ", houses);
        return res.status(200).json(houses)
    }catch(e){
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in getAllHouses controller: ", errorMessage);
        res.status(500).json({message: errorMessage});
    }
}

