import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "@/app/_components/restaurant-details";
import ProductList from "@/app/_components/product-list";
import CartBanner from "@/app/products/[id]/_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { prismaDecimalParse } from "@/app/_helpers/prisma";
import { Header } from "@/app/_components/header";

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
    <div className="">
      <Header haveSearchbar={true} />
      <div className="bg-white md:px-20 lg:px-32">
        <div className="md:flex md:gap-8">
          <div className="md:w-4/5 lg:max-w-[70%] ">
            <RestaurantImage
              restaurant={prismaDecimalParse(restaurant)}
              userId={session?.user?.id}
              userFavoritedRestaurants={prismaDecimalParse(favoriteRestaurants)}
            />
          </div>
          <div className="md:w-full lg:max-w-[30%]">
            <RestaurantDetails restaurant={prismaDecimalParse(restaurant)} />
          </div>
        </div>

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
    </div>
  );
};

export default RestaurantPage;
