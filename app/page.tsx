import CategoryList from "./_components/category-list";
import { Header } from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
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
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner src={"/promo_banner.svg"} alt="Promoção de Pizza" />
      </div>
      <div className=" space-y-3 pt-6">
        <div className="flex items-center justify-between px-5 ">
          <h2 className="font-semibold"> Pedidos Recomendados</h2>
          <Button
            variant={"ghost"}
            className="text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-6">
        <PromoBanner src={"/promo_banner_2.svg"} alt="A partir de 17,90" />
      </div>
    </div>
  );
}
