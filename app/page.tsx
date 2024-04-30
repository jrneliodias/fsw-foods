import Image from "next/image";
import CategoryList from "./_components/category-list";
import { Header } from "./_components/header";
import Search from "./_components/search";

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
    </div>
  );
}
