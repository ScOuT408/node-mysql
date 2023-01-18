import React, { useEffect } from "react";
import axios from "axios";

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/api/books/");
      console.log(res.data.data);
    };
    fetchData();
  }, []);

  return <div>Home</div>;
}

export default Home;
