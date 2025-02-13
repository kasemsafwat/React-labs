import React, { createContext, useState, useContext } from "react";
import Swal from "sweetalert2";
import { TokenContext } from "./TokenContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { token } = useContext(TokenContext);

  const addToCart = (product) => {
    if (token) {
      fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 5,
          date: new Date().toISOString().split("T")[0],
          products: [{ productId: product.id, quantity: 1 }],
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setCart((prevCart) => [...prevCart, product]);
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Product added to cart",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(json);
          
        })
        .catch((error) => console.error("Error adding to cart:", error));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
      });
    }
  };

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
