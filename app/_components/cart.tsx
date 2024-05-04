"use client";

import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);
  return (
    <div className="flex h-full flex-col justify-between gap-3 py-5">
      <div className="flex-1 space-y-2">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>
      <Card>
        <CardContent className="flex flex-col gap-2 p-5">
          <div className="flex items-center justify-between ">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subTotalPrice)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between ">
            <span className="text-muted-foreground">Descontos</span>
            <span>-{formatCurrency(totalDiscounts)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between ">
            <span className="text-muted-foreground">Entrega</span>
            {Number(products[0].restaurant.deliveryFee) === 0 ? (
              <span className="uppercase text-primary">Grátis</span>
            ) : (
              <span>
                {formatCurrency(Number(products[0].restaurant.deliveryFee))}
              </span>
            )}
          </div>
          <Separator />
          <div className="flex items-center justify-between  font-semibold">
            <span className="">Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </CardContent>
      </Card>
      <Button>Finalizar pedido</Button>
    </div>
  );
};

export default Cart;
