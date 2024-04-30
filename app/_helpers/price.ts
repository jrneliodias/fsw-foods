import { Product } from "@prisma/client";
export const calculateProductTotalPrice = (product: Product) => {
  const productPrice = Number(product.price);
  if (product.discountPercentage === 0) {
    return productPrice;
  }
  const discount = productPrice * (product.discountPercentage / 100);

  return productPrice - discount;
};

export const formatCurrency = (value: number): string => {
  return `R$${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)}`;
};
