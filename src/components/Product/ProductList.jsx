import React, { useState, useEffect, useContext } from "react";
import SearchBar from "./SearchBar";
import ProductItem from "./ProductItem";
import { CartContext } from "../Context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPage = 6;

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const { addToCart } = useContext(CartContext);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredProducts.length / itemPage);
  const indexOfLastItem = currentPage * itemPage;
  const indexOfFirstItem = indexOfLastItem - itemPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  return (
    <div className="container mt-4">
      <SearchBar setSearchQuery={handleSearch} />

      {loading ? (
        <p className="text-center text-muted">Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-muted">No Products available</p>
      ) : (
        <>
          <div className="row mt-4 g-4">
            {currentProducts.map((product) => (
              <ProductItem key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center my-5">
              <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`btn me-1 ${
                    currentPage === index + 1 ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="btn btn-outline-primary ms-2"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
