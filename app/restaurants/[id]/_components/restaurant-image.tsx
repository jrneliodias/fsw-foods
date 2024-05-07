"use client";

import { favoriteRestaurant } from "@/app/_actions/restaurant";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RestaurantImageProps {
  restaurant: Restaurant;
  userId?: string;
}
function RestaurantImage({ userId, restaurant }: RestaurantImageProps) {
  const router = useRouter();

  const handleBackClick = () => router.back();

  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await favoriteRestaurant(userId, restaurant.id);
      toast.success("Restaurante favoritado com sucesso!");
    } catch (error) {
      toast.error("Erro ao favoritar o restaurante.");
    }
  };

  return (
    <div className="relative z-10 h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        className="absolute right-4 top-4 h-10 w-10 rounded-full bg-muted-foreground "
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
}

export default RestaurantImage;
