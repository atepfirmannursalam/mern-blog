import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";

// Memuat variabel lingkungan dari file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware keamanan menggunakan Helmet
app.use(helmet());

// Middleware untuk parsing body dari request
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

// Definisi route atau endpoint di sini

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
