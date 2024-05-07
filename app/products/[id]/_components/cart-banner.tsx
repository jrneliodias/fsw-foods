"use client";

import Cart from "@/app/_components/cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";

import { useContext, useState } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}
const CartBanner = ({ restaurant }: CartBannerProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductOnCart) return null;
  return (
    <div className="sticky bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="text-sm text-muted-foreground">Total sem entrega</p>
          <div className="flex items-baseline">
            <h3 className="font-semibold">
              {formatCurrency(
                totalPrice - Number(products?.[0].restaurant?.deliveryFee),
              )}
            </h3>
            <span className="text-sm text-muted-foreground">
              / {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
            </span>
          </div>
        </div>
        <Button className="px-5" onClick={() => setIsCartOpen(true)}>
          {" "}
          Ver Sacola
        </Button>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-5/6">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
