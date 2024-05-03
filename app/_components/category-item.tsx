import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Button asChild className="hover:bg-card" variant={"ghost"}>
      <Link
        href={`/categories/${category.id}/products`}
        className="flex items-center justify-center gap-3 rounded-full px-4 py-6 shadow-md "
      >
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={30}
          height={30}
        />
        <span className="text-sm font-semibold">{category.name}</span>
      </Link>
    </Button>
  );
};

export default CategoryItem;
