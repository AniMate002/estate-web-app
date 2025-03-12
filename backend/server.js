// IMPORT LIBRARIES
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

// IMPORTING ROUTES
import housesRoute from "./routes/houses.route.js"

// IMPORT MONGODB CONNECTION
import connectMongoDB from "./mongoDB/connectMongoDB.js"

//CONFIGURE ENV VARIABLES
dotenv.config()
const PORT = process.env.PORT || 5000


// CREATE APP
const app = express();

// MIDDLEWARE CONFIG
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

// APPLYING ROUTES
app.use("/api/houses", housesRoute)

// LISTEN TO SERVER
app.listen(PORT, () => {
    console.log("Server is running: http://localhost:"+ PORT);
    connectMongoDB()
});