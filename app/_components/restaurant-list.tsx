import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { prismaDecimalParse } from "../_helpers/prisma";
async function RestaurantList() {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 10,
  });

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5  md:p-0 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant, index) => (
        <RestaurantItem
          key={index}
          restaurant={prismaDecimalParse(restaurant)}
          userId={session?.user?.id}
          userFavoritedRestaurants={prismaDecimalParse(userFavoriteRestaurants)}
          classname="min-w-[266px] max-w-[266px]"
        />
      ))}
    </div>
  );
}

export default RestaurantList;
