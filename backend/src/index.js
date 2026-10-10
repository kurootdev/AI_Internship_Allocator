import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./DB/index.js";
import authRouter from "./routes/authRoutes.route.js";
import employeeRouter from "./routes/employee.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());


// Routes
app.use("/api/user", authRouter);
app.use("/api/employee", employeeRouter);

app.get("/", (req, res) => res.send("API is running"));

// Database + Server
connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
