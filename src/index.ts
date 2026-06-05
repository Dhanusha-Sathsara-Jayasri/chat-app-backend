import express from "express";
import user from "./routes/user";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to ChatApp API");
});

app.use("/user",user);

app.listen(3000,()=>{
    console.log("API Started...");
    console.log("API Url : http://localhost:3000");
});