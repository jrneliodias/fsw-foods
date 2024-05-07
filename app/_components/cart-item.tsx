import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}
const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);
  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);
  const handleremoveProductClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="my-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 rounded-lg">
          <Image
            src={cartProduct.imageUrl}
            fill
            sizes={"100%"}
            alt={cartProduct.name}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <div className="flex items-center ">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="h-6 w-6 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className=" w-6 text-center text-xs">
              {cartProduct.quantity}
            </span>
            <Button
              size={"icon"}
              variant={"default"}
              className="h-6 w-6 border border-solid border-muted-foreground"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handleremoveProductClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
