import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Category.model.css";
import { Link } from "react-router";
import { CartContext } from "../Context/CartContext";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [products, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("electronics");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));

    fetchCategoryProducts("electronics");
  }, []);

  const fetchCategoryProducts = (category) => {
    setSelectedCategory(category);
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  };

  const { addToCart } = useContext(CartContext);

  return (
    <React.Fragment>
      <div className="container mt-4">
        <h2>Categories</h2>
        <div className="d-flex justify-content-center align-sm-center gap-5">
          {category.map((category, index) => (
            <button
              key={index}
              className={`btn ${
                selectedCategory === category
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => fetchCategoryProducts(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-4">
            <h3 className="my-5 catTitle">Products in {selectedCategory}</h3>
            {products.length > 0 ? (
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-md-6 col-lg-4 col-12 d-flex g-5">
                    <div
                      className="card shadow-sm w-100 border-0"
                      style={{ minHeight: "450px" }}
                    >
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ borderBottom: "1px solid #ccc" }}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="img-fluid rounded"
                          style={{
                            maxHeight: "180px",
                            objectFit: "contain",
                            paddingBottom: "8px",
                          }}
                        />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title fw-bold">{product.title}</h5>
                        <p className="card-text text-muted small">
                          {product.description}
                        </p>
                        <p className="card-text text-primary fw-bold fs-5">
                          ${product.price}
                        </p>
                        <div className="d-flex justify-content-center align-items-center mb-2">
                          <span className="text-warning me-1">
                            <FaStar /> {product.rating.rate}
                          </span>
                          <span className="text-secondary">
                            ({product.rating.count} reviews)
                          </span>
                        </div>
                        <p className="badge bg-secondary">{product.category}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-around pb-4">
                        <Link
                          className="btn btn-info"
                          to={`/product-details/${product.id}`}
                        >
                          View
                        </Link>
                        <button className="btn btn-success" onClick={addToCart}>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading products...</p>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Categories;
