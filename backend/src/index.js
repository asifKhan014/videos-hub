import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("Hello, wold!");
})

app.listen(PORT, ()=> {
    console.log("server is runniing on port "+PORT);
})