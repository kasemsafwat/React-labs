import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router";

const ProductDetails = () => {
  let { id } = useParams();

  const [details, setDetails] = useState(null);

  async function getDetails(productId) {
    try {
      let res = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setDetails(res.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  useEffect(() => {
    if (id) {
      getDetails(id);
    }
  }, [id]);

  return (
    <React.Fragment>
      <div className="container my-5">
        {details ? (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-sm p-4 border-0 rounded-4">
                <div className="row g-4">
                  <div className="col-md-5 text-center">
                    <img
                      src={details.image}
                      alt={details.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: "300px" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <h2 className="fw-bold">{details.title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <p className="text-muted">{details.category}</p>
                      <p className="text-warning d-flex align-items-center gap-1">
                        <FaStar /> {details.rating.rate}
                      </p>
                    </div>
                    <h4 className="text-success fw-bold">${details.price}</h4>
                    <p className="text-secondary">{details.description}</p>
                    <button className="btn btn-primary w-100 mt-3">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading product details...</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
