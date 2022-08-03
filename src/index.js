import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import router from "./routers/indexRouter.js";
import userRouter from "./routers/userRouter.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Servidor Online'));