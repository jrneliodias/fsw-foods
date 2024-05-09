"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
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
import ProductList from "./product-list";
import { CartContext } from "../_context/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Cart from "./cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import Link from "next/link";
import { prismaDecimalParse } from "../_helpers/prisma";
import ProductImage from "../products/[id]/_components/product-image";

interface ProductDetailProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  juices: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}
const ProductDetails = ({ product, juices }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { addProductToCart, products } = useContext(CartContext);

  const handleIncreaseQuantityClick = () => {
    setQuantity((currentState) => currentState + 1);
  };

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({ emptyCart: false });
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
    <div className="">
      <div className="md:flex md:gap-8">
        <ProductImage product={product} />
        <header className="relative z-50 mt-[-1.5rem] rounded-t-3xl  bg-[#f4f4f4] py-5 md:m-0 md:w-5/6">
          <div className="flex items-center gap-1 px-5">
            <Link
              href={`/restaurants/${product.restaurantId}`}
              className=" flex items-center gap-2 rounded-md border p-2"
            >
              <div className="relative h-6 w-6">
                <Image
                  src={product.restaurant.imageUrl}
                  alt={product.restaurant.name}
                  fill
                  sizes={"100%"}
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-muted-foreground ">
                {product.restaurant.name}
              </span>
            </Link>
          </div>
          <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">
            {product.name}
          </h1>

          <div className="flex justify-between px-5">
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

            <div className="flex items-center gap-3 ">
              <Button
                size={"icon"}
                variant={"ghost"}
                className="h-8 w-8 border border-solid border-muted-foreground"
                onClick={handleDecreaseQuantityClick}
              >
                <ChevronLeftIcon size={18} />
              </Button>
              <span className="w-3">{quantity}</span>
              <Button
                size={"icon"}
                variant={"default"}
                className="h-8 w-8 border border-solid border-muted-foreground"
                onClick={handleIncreaseQuantityClick}
              >
                <ChevronRightIcon size={18} />
              </Button>
            </div>
          </div>
          <Card className="mx-5 mt-6 flex justify-around py-2">
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
          <div className="mt-6 space-y-3 px-5">
            <h3 className="font-semibold"> Sobre</h3>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <div className="mt-6 hidden px-5 md:block">
            <Button
              className="w-full font-semibold"
              onClick={handleAddToCartClick}
            >
              Adicionar à sacola
            </Button>
          </div>
        </header>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold md:p-0"> Sucos</h3>
        <ProductList products={prismaDecimalParse(juices)} />
      </div>

      <div className="mt-6 px-5 md:hidden">
        <Button className="w-full font-semibold" onClick={handleAddToCartClick}>
          Adicionar à sacola
        </Button>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-5/6">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja esvaziar sua sacola?</AlertDialogTitle>
            <AlertDialogDescription>
              Notamos que já existem produtos de outro restaurante na sacola.
              Deseja esvaziá-la?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductDetails;
