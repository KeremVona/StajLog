import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/authentication/userRoutes.js";

dotenv.config({ path: "../.env" });

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/authentication", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
