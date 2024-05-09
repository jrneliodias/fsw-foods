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
    <div>
      <Header haveSearchbar={true} />
      <div className="my-5 px-5 md:px-20 lg:px-32 ">
        <h2 className="mb-3 text-lg font-semibold">Produtos Recomendados</h2>
        <div className="grid w-full grid-cols-2 gap-6 lg:flex lg:flex-row lg:flex-wrap lg:object-center">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              classname="min-w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProductsPage;
