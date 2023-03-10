import { connection } from "./connect.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";

//routers
import booksRoute from "./routes/booksRoute.js";

const app = express();

// dotenv config
dotenv.config();

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cloudinary setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});


//test route
app.get("/", (req, res) => {
  res.send("Hello from vercel");
});

// all routes
app.use("/api/books", booksRoute);

// listening the app
app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
