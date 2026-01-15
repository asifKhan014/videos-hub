import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import router from './route/index.ts';
import passport from './config/passportJwtStrategy.ts';
import cors from 'cors';
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(passport.initialize());
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req, res)=>{
    res.send("Hello, wold!");
})

app.listen(PORT, ()=> {
    console.log("server is runniing on port "+PORT);
    connectDB();

})