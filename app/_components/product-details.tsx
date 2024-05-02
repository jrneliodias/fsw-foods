"use client";
import Image from "next/image";
import React, { useState } from "react";
import DiscountBadge from "./discount-badge";
import { Prisma } from "@prisma/client";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { Card } from "./ui/card";

interface ProductDetailProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}
const ProductDetails = ({ product }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () => {
    setQuantity((currentState) => currentState + 1);
  };

  const handleDecreaseQuantityClick = () => {
    setQuantity((currentState) => {
      if (currentState === 1) {
        return currentState;
      }
      return currentState - 1;
    });
  };
  return (
    <header className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white p-5">
      <div className="flex items-center gap-1">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          {product.discountPercentage && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-3">{quantity}</span>
          <Button
            size={"icon"}
            variant={"default"}
            className="border border-solid border-muted-foreground"
            onClick={handleIncreaseQuantityClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <Card className="mt-6 flex justify-around py-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Entrega</span>
            <BikeIcon size={16} />
          </div>
          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-sm font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">Grátis</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Entrega</span>
            <TimerIcon size={16} />
          </div>
          {
            <p className="text-sm font-semibold">
              {product.restaurant.deliveryTimeMinutes} min
            </p>
          }
        </div>
      </Card>
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold"> Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
    </header>
  );
};

export default ProductDetails;
