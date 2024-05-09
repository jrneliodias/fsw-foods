import { Header } from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { prismaDecimalParse } from "@/app/_helpers/prisma";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({
    orderBy: {
      rating: "desc",
    },
  });

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createAt: "desc",
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header haveSearchbar={true} />
      <div className="my-5 px-5 md:px-20 lg:px-32">
        <h2 className="mb-3 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:flex-wrap lg:justify-center">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={prismaDecimalParse(restaurant)}
              userId={session?.user?.id}
              userFavoritedRestaurants={userFavoriteRestaurants}
              classname="min-w-full max-w-full lg:max-w-96 lg:min-w-96"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurants;
