"use client";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

import useHandleFavoriteRestaurant from "../_hooks/use-favorite-restaurant";
import { isFavoriteRestaurant } from "../_helpers/restaurants";

interface RestauranItemProps {
  restaurant: Restaurant;
  classname?: string;
  userId?: string;
  userFavoritedRestaurants: UserFavoriteRestaurant[];
}
const RestaurantItem = ({
  restaurant,
  classname,
  userId,
  userFavoritedRestaurants,
}: RestauranItemProps) => {
  const isFavorite = isFavoriteRestaurant(
    userFavoritedRestaurants,
    restaurant.id,
  );

  const { handleFavoriteClick } = useHandleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId,
    isFavoriteRestaurant: isFavorite,
  });

  return (
    <div className={cn(" space-y-3", classname)}>
      <div className="space-y-3">
        <div className="relative h-[136px] w-full lg:h-[180px]">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              alt={restaurant.name}
              sizes="100%"
              className="rounded-lg object-cover shadow-md"
            />
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-2 py-[2px]">
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              {/* insert the restaurant rating with one decimal place */}

              <span className="text-xs font-semibold">
                {Number(restaurant.rating).toFixed(1)}
              </span>
            </div>
          </Link>

          <Button
            className={`absolute right-2 top-2 h-7 w-7 rounded-full${isFavorite ? "bg-primary" : " bg-muted-foreground "}`}
            onClick={handleFavoriteClick}
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>
        <div className="">
          <h3 className="truncate text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <BikeIcon className="text-primary" size={14} />
                <span className="text-xs">
                  {Number(restaurant.deliveryFee) === 0
                    ? "Entrega Grátis"
                    : formatCurrency(Number(restaurant.deliveryFee))}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <TimerIcon className="text-primary" size={14} />
                <span className="text-xs">
                  {restaurant.deliveryTimeMinutes} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
