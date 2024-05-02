import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "@/app/_components/product-details";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";

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
      <ProductDetails product={products} />
      <div className="mt-6 space-y-3">
        <h3 className="mx-5 font-semibold"> Sucos</h3>
        <ProductList products={juices} />
      </div>
      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </section>
  );
};

export default ProductPage;
