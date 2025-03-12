import mongoose from "mongoose";



const houseSchema = new mongoose.Schema({
    name: { type: String, required: true},
    location: { type: String },
    beds: { type: Number },
    baths: { type: Number },
    price: { type: Number },
    square: { type: Number },
    description: { type: String },
    image: { type: String, required: true }
}, { timestamps: true })

export const House = mongoose.model("House", houseSchema)