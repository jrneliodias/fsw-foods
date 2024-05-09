import CategoryList from "./_components/category-list";
import { Header } from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import { prismaDecimalParse } from "./_helpers/prisma";
import Image from "next/image";

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
    <main className="bg-white pb-4">
      <header className="">
        <Header haveSearchbar={false} />
      </header>
      <div className="overflow-y-hidden px-5 pt-6 md:flex md:h-[calc(100vh-4rem)] md:justify-between md:bg-primary md:px-20 lg:px-32">
        <div className="text-white  md:flex md:max-w-[41.25rem] md:flex-col md:justify-center">
          <div className="hidden w-full md:block md:pb-8">
            <h1 className=" mb-2 text-6xl font-bold ">Está com fome?</h1>
            <p className="text-md">
              Com apenas amduns cliques, encontre refeições acessíveis perto de
              você.
            </p>
          </div>
          <div className="md:rounded-md md:bg-white md:p-6">
            <Search />
          </div>
        </div>
        <div className="hidden rounded-full shadow-[-100px_100px_80px_rgba(0,0,0,0.3)] 2xl:-mb-16 2xl:block 2xl:h-[40rem] 2xl:w-[40rem] 2xl:self-end">
          <Image
            src={"/cupnoodles.png"}
            width={0}
            height={0}
            alt="Cupnoodles"
            sizes="100vw"
            className=" mr-10 hidden 2xl:block 2xl:h-fit 2xl:w-[40rem]"
          />
        </div>
      </div>
      <div className="px-5 pt-6 md:p-10 md:px-20 lg:px-32">
        <CategoryList />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-5 md:px-20 lg:px-32">
        <div className="px-5 pt-6 md:p-0">
          <PromoBanner src={"/promo_banner.svg"} alt="Promoção de Pizza" />
        </div>
        <div className=" space-y-3 pt-6 md:order-last md:col-span-2 md:w-full md:px-0">
          <div className="flex items-center justify-between px-5 md:px-0">
            <h2 className="font-semibold"> Pedidos Recomendados</h2>
            <Button
              asChild
              variant={"ghost"}
              className="text-primary hover:bg-transparent"
            >
              <Link href={"/products/recommended"}>
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <ProductList products={prismaDecimalParse(products)} />
        </div>
        <div className="px-5 pt-6 md:p-0">
          <PromoBanner src={"/promo_banner_2.svg"} alt="A partir de 17,90" />
        </div>
      </div>
      <div className=" space-y-3 pt-6 md:px-20 lg:px-32">
        <div className="flex items-center justify-between px-5 md:px-0 ">
          <h2 className="font-semibold"> Restaurantes Recomendados</h2>
          <Button
            asChild
            variant={"ghost"}
            className="text-primary hover:bg-transparent"
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </main>
  );
}
