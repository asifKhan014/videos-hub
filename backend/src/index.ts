import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import router from './route/index.ts';
dotenv.config();

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