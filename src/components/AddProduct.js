import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    // ketika submit tidak ganti halaman
    e.preventDefault();
    const product = {
      title,
      price,
    };

    await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  return (
    <section>
      <form onSubmit={saveProduct}>
        <div className="field">
          <label htmlFor="" className="label">
            Title
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Price
          </label>
          <div className="control">
            <input
              type="number"
              className="input"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary">Save</button>
          </div>
        </div>

        <p>
          {title} - {price}
        </p>
      </form>
    </section>
  );
}
