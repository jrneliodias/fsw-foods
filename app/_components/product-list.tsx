import { prismaDecimalParse } from "../_helpers/prisma";
import ProductItem from "./product-item";
import { Prisma } from "@prisma/client";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll  px-5 md:p-0 [&::-webkit-scrollbar]:hidden">
      {products.map((product, index) => (
        <ProductItem key={index} product={prismaDecimalParse(product)} />
      ))}
    </div>
  );
};

export default ProductList;
