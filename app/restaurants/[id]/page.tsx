import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "@/app/_components/restaurant-details";
import ProductList from "@/app/_components/product-list";
import CartBanner from "@/app/products/[id]/_components/cart-banner";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
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

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
      <RestaurantDetails restaurant={restaurant} />

      <div className="mt-6 space-y-4 ">
        <h2 className="px-5 font-semibold"> Mais pedidos</h2>
        <ProductList products={products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4 " key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.Product} />
        </div>
      ))}
      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPage;
