"use client";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";

interface RestaurantDetailProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true;
    };
  }>;
}
const RestaurantDetails = ({ restaurant }: RestaurantDetailProps) => {
  return (
    <header className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-[#f4f4f4] p-5 md:m-0 md:flex md:h-full md:flex-col md:justify-between md:rounded-lg">
      <div className="flex items-center gap-1 lg:gap-5">
        <div className="relative h-8 w-8">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            sizes="100%"
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="mb-2 mt-1 flex-1 text-xl font-semibold">
          {restaurant.name}
        </h1>

        <div className="flex items-center gap-[2px] rounded-full bg-foreground px-3 py-1">
          <StarIcon size={18} className="fill-yellow-400 text-yellow-400" />
          <span className=" font-semibold text-white">5.0</span>
        </div>
      </div>

      <Card className="mt-6 flex justify-around py-2  lg:flex-col lg:gap-8 lg:p-5">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Entrega</span>
            <BikeIcon size={16} />
          </div>
          <span className="font-semibold">
            {Number(restaurant.deliveryFee) > 0
              ? formatCurrency(Number(restaurant.deliveryFee))
              : "Grátis"}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Entrega</span>
            <TimerIcon size={16} />
          </div>
          <span className="font-semibold">
            {restaurant.deliveryTimeMinutes} min{" "}
          </span>
        </div>
      </Card>
      <div className="mt-3 flex justify-around gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="min-w-[100px] rounded-lg border-2 bg-[#F4F4F4] text-center"
            key={category.id}
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default RestaurantDetails;
