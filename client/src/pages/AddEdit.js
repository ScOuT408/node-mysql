import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

function AddEdit() {
  const { id } = useParams();

  const [book, setBook] = useState();

  const [values, setValues] = useState({
    name: "",
    book_desc: "",
    author: "",
  });

  useEffect(() => {
    if (id) {
      const fetchBooks = async () => {
        const res = await axios.get(
          `https://api-node-mysql-five.vercel.app/api/books/${id}`
        );
        setBook(res.data.data[0]);
      };
      fetchBooks();
    }
  }, [id]);

  useEffect(() => {
    if (id && book) {
      setValues({ ...book });
    }
  }, [id, book]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { name, book_desc, author } = values;

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setValues({ ...values, image: file });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("book_desc", book_desc);
    formData.append("file", values.image);
    formData.append("author", author);

    if (id) {
      try {
        const res = await axios.put(
          `https://api-node-mysql-five.vercel.app/api/books/update/${id}`,
          formData
        );
        toast.success(res.data.message);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post(
          "https://api-node-mysql-five.vercel.app/api/books/add",
          formData
        );
        toast.success(res.data.message);
      } catch (err) {
        console.log(err);
      }
      setValues({
        name: "",
        book_desc: "",
        author: "",
      });
    }
  };

  return (
    <div className="form_box">
      <form action="#" onSubmit={handleSubmit}>
        <h2> {id ? "Update Book" : "Add a book"} </h2>
        <input
          type="text"
          placeholder="Book name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Book description"
          name="book_desc"
          value={values.book_desc}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Author name"
          name="author"
          value={values.author}
          onChange={handleChange}
        />
        <small>
          <strong> NOTE: </strong> image field can't be empty
        </small>
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={changeImageHandler}
        />
        <button> {id ? "Update Book" : "Add Book"} </button>
      </form>
    </div>
  );
}

export default AddEdit;
