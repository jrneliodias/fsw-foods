"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}
function ProductImage({ product }: ProductImageProps) {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative z-10 h-[360px] w-full overflow-hidden md:h-auto md:w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes={"100%"}
        className="object-cover lg:rounded-lg"
      />
      <Button
        className="absolute left-2 top-2 rounded-full bg-white text-foreground hover:text-white"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
}

export default ProductImage;
