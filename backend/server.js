//pour lancer le backend  terminal => cd backend puis npm run server

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
// import dotenv from "dotenv"
//  import bodyParser from "body-parser"

import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js" //7:49:06

//essai 29 aout 2024
import adminRouter from "./routes/adminRoute.js"

//app config
const app = express()
const port = process.env.PORT || 4000; //pour déployer le site

//middleware
app.use(express.json())
app.use(cors())//permet d'accèder de backend à frontend
//  app.use(bodyParser())

// db connexion
connectDB();
console.log("db is connected");

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)//7:49:06

//essai 29 aout 2024
app.use("/api/admin", adminRouter)

// username:athenajade  mot passe: upHKsOYpazbP3iAJ
// mongodb+srv://athenajade72:<password>@cluster0.xidctr2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//get permet d'afficher la page demandée
app.get("/", (req, res)=>{
    res.send("Api working")
})

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);     
})