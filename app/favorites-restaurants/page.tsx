import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { Header } from "../_components/header";
import { redirect } from "next/navigation";
import RestaurantItem from "../_components/restaurant-item";
import { prismaDecimalParse } from "../_helpers/prisma";

const FavoriteRestaurantsPage = async () => {
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
      <div className="px-5 py-6 md:px-20 lg:px-32">
        <h2 className="font-semibold md:text-xl">Restaurantes favoritos</h2>
        <div className="flex w-full flex-col justify-center gap-2 py-5 md:flex-row md:flex-wrap md:gap-5">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <div
                key={restaurant.id}
                className="mx-auto flex w-full max-w-96 flex-col  gap-2  py-2 md:max-w-72"
              >
                <RestaurantItem
                  userId={session?.user?.id}
                  restaurant={prismaDecimalParse(restaurant)}
                  userFavoritedRestaurants={prismaDecimalParse(
                    userFavoriteRestaurants,
                  )}
                />
              </div>
            ))
          ) : (
            <p>Você não tem nenhum restaurante favorito</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoriteRestaurantsPage;
