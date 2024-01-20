import express, { json } from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

// Memuat variabel lingkungan dari file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware keamanan menggunakan Helmet
app.use(helmet());

// Middleware untuk parsing body dari request json input
app.use(express.json());

// Menghubungkan ke MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mengecek koneksi ke MongoDB
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("Connection error:", err);
});
db.once("open", () => {
  console.log("MongoDB is Connected");
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Definisi route atau endpoint di sini
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// middleware to handle error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
