"use client";

import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="py-5">
      <div className="space-y-2">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
