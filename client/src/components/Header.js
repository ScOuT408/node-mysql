import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="flex">
        <Link className="link" to="/">
          <div>Home</div>
        </Link>
        <Link className="link" to="/add">
          <div>Add Book</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
