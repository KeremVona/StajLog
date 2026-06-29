import express, { type Express } from "express";
import cors from "cors";
import userRoutes from "#/routes/auth/authRoute";
import internshipRoutes from "#/routes/internship/internshipRoute";
const app: Express = express();

const port = 5000;

app.use(express.json());

app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/internship", internshipRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
