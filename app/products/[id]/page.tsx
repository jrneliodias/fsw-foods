import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "@/app/_components/product-details";

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
    <section className="mb-6">
      <ProductImage product={products} />
      <ProductDetails product={products} juices={juices} />
    </section>
  );
};

export default ProductPage;
