import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/carts/user/2");
        const carts = await response.json();

        if (carts.length === 0) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        const lastCart = carts[carts.length - 1];

        const productRequests = lastCart.products.map((item) =>
          fetch(`https://fakestoreapi.com/products/${item.productId}`).then(
            (res) => res.json()
          )
        );

        const products = await Promise.all(productRequests);

        const cartWithDetails = products.map((product, index) => ({
          ...product,
          quantity: lastCart.products[index].quantity,
        }));

        setCartItems(cartWithDetails);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  if (loading) {
    return <p className="text-center text-muted fs-5">Loading cart...</p>;
  }

  return (
    <div className="container py-3">
      <h2 className="text-center fw-bold mb-3">🛒 Your Cart</h2>

      {cartItems.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="card shadow-sm p-2 text-center"
              style={{ width: "120px", minHeight: "180px" }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top mx-auto"
                style={{ height: "50px", objectFit: "contain" }}
              />
              <div className="card-body p-2">
                <h6 className="card-title text-truncate small">
                  {product.title}
                </h6>
                <p className="text-muted small mb-1">${product.price}</p>
                <p className="text-muted small">Qty: {product.quantity}</p>
                <button
                  className="btn btn-danger btn-sm d-flex align-items-center justify-content-center w-100"
                  onClick={() => removeFromCart(product.id)}
                >
                  <FaTrash className="me-1" size={10} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted fs-5 mt-4">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
