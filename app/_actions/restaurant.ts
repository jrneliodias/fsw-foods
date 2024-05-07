"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const favoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  const userAlreadyFavoritedThisRestaurant =
    await db.userFavoriteRestaurant.findFirst({
      where: {
        userId,
        restaurantId,
      },
    });
  if (userAlreadyFavoritedThisRestaurant) {
    throw new Error("User already favorited this restaurant");
  }

  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });
  revalidatePath("/favorites-restaurants");
  revalidatePath("/");
};

export const unfavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  await db.userFavoriteRestaurant.delete({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  });
  revalidatePath("/favorites-restaurants");
  revalidatePath("/");
};
