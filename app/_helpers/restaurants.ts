import { UserFavoriteRestaurant } from "@prisma/client";
export const isFavoriteRestaurant = (
  userFavoritedRestaurants: UserFavoriteRestaurant[],
  restaurantId: string,
) =>
  userFavoritedRestaurants.some(
    (favoriteRestaurant) => favoriteRestaurant.restaurantId === restaurantId,
  );
