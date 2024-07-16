import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app=express();

app.use(express.json())
app.use("/", userRoutes);
app.use(bodyParser.json())
app.use(cors({
    origin: 'https://localhost:3000/',
    credentials: true,
}));

export default app;