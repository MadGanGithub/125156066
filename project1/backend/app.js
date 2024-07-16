import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app=express();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json())
app.use("/", userRoutes);
app.use(bodyParser.json())

export default app;