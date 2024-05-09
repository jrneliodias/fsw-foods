import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductDetails from "@/app/_components/product-details";
import { prismaDecimalParse } from "@/app/_helpers/prisma";
import { Header } from "@/app/_components/header";

interface ProductPageProps {
  params: {
    id: string;
  };
}
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const products = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!products) {
    return notFound();
  }
  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: products?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <section className="mb-6 md:space-y-5">
      <div className="hidden md:block">
        <Header haveSearchbar={true} />
      </div>
      <div className="md:px-20 lg:px-32">
        <ProductDetails
          product={prismaDecimalParse(products)}
          juices={prismaDecimalParse(juices)}
        />
      </div>
    </section>
  );
};

export default ProductPage;
