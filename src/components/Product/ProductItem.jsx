import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { CounterContext } from "../Context/CounterContext";
import { Link } from "react-router";

const ProductItem = ({ product, addToCart }) => {
  let { counter, setCounter } = useContext(CounterContext);

  return (
    <React.Fragment>
      <div className="col-12 col-sm-6 col-lg-4 d-flex">
        <div className="card shadow-sm w-100 border-0">
          <div className="d-flex justify-content-center align-items-center p-3">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
              style={{
                height: "180px",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="card-body text-center">
            <h5 className="card-title fw-bold text-truncate">{product.title}</h5> {/* ✅ منع النص الطويل */}
            <p className="card-text text-muted small text-truncate">{product.description}</p>
            <p className="card-text text-primary fw-bold fs-5">${product.price}</p>
            <div className="d-flex justify-content-center align-items-center mb-2">
              <span className="text-warning me-1">
                <FaStar /> {product?.rating?.rate || "No Rating"}
              </span>
              <span className="text-secondary">
                ({product?.rating?.count || 0} reviews)
              </span>
            </div>
            <p className="badge bg-secondary">{product.category}</p>
            <div className="d-flex justify-content-between mt-3">
              <Link
                to={`/product-details/${product.id}`}
                className="btn btn-success btn-sm"
                onClick={() => setCounter(counter + 1)}
              >
                View
              </Link>
              <button
                className="btn btn-info text-light btn-sm"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductItem;
