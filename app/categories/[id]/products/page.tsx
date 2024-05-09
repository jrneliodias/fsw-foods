import { Header } from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}
const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      Product: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }
  return (
    <>
      <Header haveSearchbar={true} />
      <div className="my-5 px-5 md:px-20 lg:px-32">
        <h2 className="mb-3 text-lg font-semibold">{category.name}</h2>
        <div className="grid w-full grid-cols-2 gap-6 lg:flex lg:flex-row lg:flex-wrap lg:object-center">
          {category?.Product.map((product) => (
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

export default CategoriesPage;
