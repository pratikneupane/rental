import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import categoryRoute from "./routes/categories.js";
import locationRoute from "./routes/locations.js";
import serviceRoute from "./routes/services.js";
import Service from "./models/Service.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// MongoDB setup
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://lord_hendrix17:admin123@clusterlearn.g6ljp.mongodb.net/?retryWrites=true&w=majority");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application on connection error
  }
};

// Setup storage for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// API endpoint for file/image upload
app.post("/api/upload", upload.array("files"), async (req, res) => {
  try {
    // Multer has already processed the files, and they are available in req.files
    const imageUrls = req.files.map((file) => file.path);

    // You can now use imageUrls to store or process the image paths as needed
    // For example, you can save them in your database or perform other operations

    // Respond with the image URLs or any other appropriate response
    res.status(200).json({ photo: imageUrls[0] });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Error uploading images" });
  }
});


// Other middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/location", locationRoute);
app.use("/api/services", serviceRoute);

// Error handling middleware
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

// Starting server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connect();
  console.log("Backend is running on port", PORT);
});
