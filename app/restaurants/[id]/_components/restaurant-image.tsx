"use client";

import { Button } from "@/app/_components/ui/button";
import { isFavoriteRestaurant } from "@/app/_helpers/restaurants";
import useHandleFavoriteRestaurant from "@/app/_hooks/use-favorite-restaurant";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Restaurant;
  userId?: string;
  userFavoritedRestaurants: UserFavoriteRestaurant[];
}
function RestaurantImage({
  userId,
  restaurant,
  userFavoritedRestaurants,
}: RestaurantImageProps) {
  const router = useRouter();
  const isFavorite = isFavoriteRestaurant(
    userFavoritedRestaurants,
    restaurant.id,
  );

  const handleBackClick = () => router.back();
  const { handleFavoriteClick } = useHandleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId,
    isFavoriteRestaurant: isFavorite,
  });

  return (
    <div className="relative z-10 h-[250px] w-full lg:h-[380px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        sizes={"100%"}
        className="rounded-lg object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        size={"icon"}
        className={`absolute right-4 top-4 h-10 w-10 rounded-full ${isFavorite ? "bg-primary" : " bg-muted-foreground "}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
}

export default RestaurantImage;
