import { House } from "../models/home.model.js";

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
    } catch (error) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error";
        console.log("Error in getHouseById controller: ", errorMessage);
        res.status(500).json({error: errorMessage});
    }
}