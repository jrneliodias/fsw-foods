"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "../_actions/search";
import { Header } from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { useSession } from "next-auth/react";
import { prismaDecimalParse } from "@/app/_helpers/prisma";

interface RestaurantsProps {
  favoritedrestaurants: UserFavoriteRestaurant[];
}
const Restaurants = ({ favoritedrestaurants }: RestaurantsProps) => {
  const session = useSession();
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchParams]);

  const searchFor = searchParams.get("search");

  if (!searchFor) {
    return notFound();
  }
  return (
    <>
      <Header />
      <div className="my-5 px-5">
        <h2 className="mb-3 text-lg font-semibold">Restaurantes encontrados</h2>
        <div className="flex w-full grid-cols-2 flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              userId={session.data?.user?.id}
              restaurant={prismaDecimalParse(restaurant)}
              userFavoritedRestaurants={prismaDecimalParse(
                favoritedrestaurants,
              )}
              classname="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
