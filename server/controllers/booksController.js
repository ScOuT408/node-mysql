import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { connection } from "../connect.js";

// @desc    get all book
// @route   GET /api/books/
export const getAllBooks = (req, res) => {
  connection.query("SELECT * FROM books", (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    return res.status(200).json({
      success: true,
      data: data,
    });
  });
};

// @desc    get single book
// @route   GET /api/book/:id
export const getSingleBook = (req, res) => {
  const { id } = req.params;

  connection.query(`SELECT * FROM books WHERE id = ${id}`, (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    return res.status(200).json({
      success: true,
      data: data,
    });
  });
};

// @desc    Add a book
// @route   POST /api/books/add

export const addBook = (req, res) => {
  const { name, book_desc, author } = req.body;

  const file = req.file;
  const fileUri = getDataUri(file);

  connection.query(
    `SELECT * FROM books WHERE name = '${name}'`,
    async (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (data.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Book already exists",
        });
      } else {
        const mycloud = await cloudinary.uploader.upload(fileUri.content);

        const q = `INSERT INTO books (public_id, name, book_desc, cover, author) VALUES ('${mycloud.public_id}', '${name}', '${book_desc}', '${mycloud.url}', '${author}')`;

        connection.query(q, (err, data) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
          }

          return res.status(200).json({
            success: true,
            message: "Book added successfully",
          });
        });
      }
    }
  );
};

// @desc    delete a book
// @route   DELETE /api/books/delete/:id
export const deleteBook = (req, res) => {
  const { id } = req.params;

  connection.query(`SELECT * FROM books WHERE id = ${id}`, (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    console.log(data);

    const public_id = data[0].public_id;

    cloudinary.v2.uploader.destroy(public_id, (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });
  });

  connection.query(`DELETE FROM books WHERE id = ${id}`, (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book removed successfully",
    });
  });
};

// @desc    update a book
// @route   UPDATE /api/books/update/:id
export const updateBook = (req, res) => {
  const { id } = req.params;
  const { name, book_desc, author } = req.body;

  const file = req.file;
  const fileUri = getDataUri(file);

  connection.query(`SELECT * FROM books WHERE id = ${id}`, (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    const public_id = data[0].public_id;

    cloudinary.v2.uploader.destroy(public_id, async (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
      const newImg = await cloudinary.uploader.upload(fileUri.content);

      connection.query(
        `UPDATE books SET public_id = '${newImg.public_id}', cover = '${newImg.url}' WHERE id = ${id}`,
        (err, data) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Internal server Problem with Cloudinary",
            });
          }
        }
      );
    });
  });

  connection.query(
    `UPDATE books SET name = '${name}', book_desc = '${book_desc}', author = '${author}' WHERE id = ${id}`,
    (err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Book updated successfully",
      });
    }
  );
};
