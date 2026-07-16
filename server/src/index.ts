import express, { type Express } from "express";
import cors from "cors";
import userRoutes from "#/routes/auth/authRoute";
import internshipRoutes from "#/routes/internship/internshipRoute";
import logRoutes from "#/routes/log/logRoute";
const app: Express = express();

const port = 5000;

app.use(express.json());

app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/internship", internshipRoutes);
app.use("/api/log", logRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
