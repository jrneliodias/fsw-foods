import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}
const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-5 ">
        <div className="flex items-center justify-between">
          <div
            className={`w-fit rounded-full bg-muted px-2 py-1 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-500 text-white"}`}
          >
            <p className="text-xs font-semibold">{order.status}</p>
          </div>

          <p className="text-sm  text-muted-foreground">
            {order.createAt.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar className=" h-8 w-8">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <h2 className="font-semibold"> {order.restaurant.name}</h2>
          </div>
          <Button variant={"ghost"} asChild size={"icon"}>
            <Link href={`/restaurants/${order.restaurant.id}`}>
              <ChevronRightIcon className="text-muted-foreground" />
            </Link>
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col">
          {order.products.map((product) => (
            <div className="flex items-center  gap-3 py-1" key={product.id}>
              <p className="h-6 w-6 rounded-full bg-muted-foreground bg-slate-200 py-1 text-center text-xs">
                {product.quantity}
              </p>
              <p className="text-muted-foreground">{product.product.name}</p>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <p>{formatCurrency(Number(order.totalPrice))}</p>
          <Button
            variant={"ghost"}
            className="px-5 text-xs text-primary"
            disabled={order.status !== "COMPLETED"}
          >
            <p>Refazer pedido</p>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
