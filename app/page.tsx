import Image from "next/image";
import CategoryList from "./_components/category-list";
import { Header } from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className=" pt-6">
        <Image
          src={"/promo_banner.svg"}
          width={0}
          height={0}
          alt="Promoção de Pixxa"
          sizes="100vw"
          className="h-auto w-full"
          quality={100}
        />
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
        <ProductList />
      </div>
    </div>
  );
}
