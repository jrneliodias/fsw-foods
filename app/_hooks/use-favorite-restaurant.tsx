import { toast } from "sonner";
import {
  favoriteRestaurant,
  unfavoriteRestaurant,
} from "../_actions/restaurant";
import { useRouter } from "next/navigation";

interface UserFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  isFavoriteRestaurant: boolean;
}

const useHandleFavoriteRestaurant = ({
  restaurantId,
  userId,
  isFavoriteRestaurant,
}: UserFavoriteRestaurantProps) => {
  const router = useRouter();
  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      if (isFavoriteRestaurant) {
        await unfavoriteRestaurant(userId, restaurantId);
        return toast.success("Restaurante desfavoritado com sucesso!");
      }
      await favoriteRestaurant(userId, restaurantId);
      toast.success("Restaurante favoritado com sucesso!", {
        action: {
          label: "Ver Favoritos",
          onClick: () => router.push("/favorites-restaurants"),
        },
      });
    } catch (error) {
      toast.error("Erro ao favoritar o restaurante.");
    }
  };

  return { handleFavoriteClick };
};

export default useHandleFavoriteRestaurant;
