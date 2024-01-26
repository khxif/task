import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Routes from "./Routes";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});

app.use("/api", Routes);
app.get("/", (req: Request, res: Response) => {
  res.json("hey");
});
