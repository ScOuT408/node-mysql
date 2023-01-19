import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(
        `https://api-node-mysql-five.vercel.app/api/books`
      );
      setBooks(res.data.data);
    };
    fetchBooks();
  }, []);

  const removeBook = async (id) => {
    await axios.delete(
      `https://api-node-mysql-five.vercel.app/api/books/delete/${id}`
    );
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="container">
      <div className="grid_box">
        {books.map((book) => (
          <Fragment key={book.id}>
            <div className="box">
              <img src={book.cover} alt="" />
              <div className="book_info">
                <h3>{book.name}</h3>
                <p>{book.book_desc}</p>
                <h4>{book.author}</h4>
              </div>
              <Link
                to={`/edit/${book.id}`}
                style={{
                  marginRight: "10px",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                <button> update book </button>
              </Link>
              <Link onClick={() => removeBook(book.id)}>
                <button> delete book </button>
              </Link>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Home;
