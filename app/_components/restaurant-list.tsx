import { db } from "../_lib/prisma";
import RestauranItem from "./restaurant-item";

async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({ take: 10 });
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant, index) => (
        <RestauranItem key={index} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default RestaurantList;
