import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "@/app/_components/restaurant-details";
import ProductList from "@/app/_components/product-list";
import CartBanner from "@/app/products/[id]/_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { prismaDecimalParse } from "@/app/_helpers/prisma";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const session = await getServerSession(authOptions);

  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          Product: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const products = await db.product.findMany({
    where: {
      restaurantId: {
        equals: id,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  const favoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createAt: "desc",
    },
    include: {
      restaurant: true,
    },
  });

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage
        restaurant={prismaDecimalParse(restaurant)}
        userId={session?.user?.id}
        userFavoritedRestaurants={prismaDecimalParse(favoriteRestaurants)}
      />
      <RestaurantDetails restaurant={prismaDecimalParse(restaurant)} />

      <div className="mt-6 space-y-4 ">
        <h2 className="px-5 font-semibold"> Mais pedidos</h2>
        <ProductList products={prismaDecimalParse(products)} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4 " key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={prismaDecimalParse(category.Product)} />
        </div>
      ))}
      <CartBanner restaurant={prismaDecimalParse(restaurant)} />
    </div>
  );
};

export default RestaurantPage;
