import { Header } from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="my-5 px-5">
        <h2 className="mb-3 text-lg font-semibold">Produtos Recomendados</h2>
        <div className="grid w-full grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              classname="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductsPage;
