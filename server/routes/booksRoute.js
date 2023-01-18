import express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controllers/booksController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/add", singleUpload, addBook);
router.put("/update/:id", singleUpload, updateBook);
router.delete("/delete/:id", deleteBook);
router.get("/:id", getSingleBook);

export default router;
