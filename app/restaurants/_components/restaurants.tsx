"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "../_actions/search";
import { Header } from "@/app/_components/header";
import RestauranItem from "@/app/_components/restaurant-item";

const Restaurants = () => {
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
            <RestauranItem
              key={restaurant.id}
              restaurant={restaurant}
              classname="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
