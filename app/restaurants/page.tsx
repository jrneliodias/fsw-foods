import { Suspense } from "react";
import Restaurants from "./_components/restaurants";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { redirect } from "next/navigation";

const RestaurantsPage = async () => {
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
    <Suspense>
      <Restaurants favoritedrestaurants={userFavoriteRestaurants} />
    </Suspense>
  );
};

export default RestaurantsPage;
