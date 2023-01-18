import React from "react";

function AddEdit() {
  return (
    <div className="form_box">
      <form action="#">
        <h2> Add a book </h2>
        <input type="text" placeholder="Book name" />
        <input type="text" placeholder="Book description" />
        <input type="text" placeholder="Author name" />
        <small>
          <strong> NOTE: </strong> image field can't be empty
        </small>
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose Image
        </label>
        <input id="file-upload" type="file" />
        <button> add book </button>
      </form>
    </div>
  );
}

export default AddEdit;
