import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("Hello, wold!");
})

app.listen(PORT, ()=> {
    console.log("server is runniing on port "+PORT);
    connectDB();

})