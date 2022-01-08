import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    setTitle(data.title);
    setPrice(data.price);
  };

  const updateProduct = async (e) => {
    // ketika submit tidak ganti halaman
    e.preventDefault();
    const product = {
      title,
      price,
    };

    await fetch(`http://localhost:8080/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  return (
    <section>
      <form onSubmit={updateProduct}>
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
            <button className="button is-primary">Update</button>
          </div>
        </div>

        <p>
          {title} - {price}
        </p>
      </form>
    </section>
  );
}
