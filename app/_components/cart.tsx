"use client";

import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Loader2, ShoppingBasketIcon } from "lucide-react";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
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
import { useRouter } from "next/navigation";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}
const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter();
  const [isSubmiLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const { data } = useSession();
  const { products, subTotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);
  const handleContinueShoppingClick = () => {
    const restaurantId = products?.[0].restaurant.id;
    setIsOpen(false);
    router.push(`/restaurants/${restaurantId}`);
  };
  const handleFinishedOrdeClick = async () => {
    if (!data?.user) return;

    const restaurant = products?.[0].restaurant;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        subTotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTime: restaurant.deliveryTimeMinutes,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();
      setIsOpen(false);
      toast("Pedido realizado com sucesso!", {
        description: "Você pode acompanhá-lo nos seus pedidos",
        action: {
          label: "Meus pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };
  return (
    <div className="flex h-full flex-col justify-between gap-3 py-5">
      {products.length > 0 ? (
        <>
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
                {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                  <span className="uppercase text-primary">Grátis</span>
                ) : (
                  <span>
                    {formatCurrency(
                      Number(products?.[0].restaurant.deliveryFee),
                    )}
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
          <Button variant={"outline"} onClick={handleContinueShoppingClick}>
            Continuar comprando
          </Button>
          <Button
            disabled={!data?.user || isSubmiLoading}
            onClick={() => setIsConfirmationDialogOpen(true)}
          >
            {isSubmiLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Finalizar pedido
          </Button>
        </>
      ) : (
        <div className=" flex flex-col items-center">
          <h2>Sua sacola está vazia</h2>
          <ShoppingBasketIcon size={100} className="text-muted-foreground" />
        </div>
      )}

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, sua ordem será gerada
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishedOrdeClick}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Cart;
