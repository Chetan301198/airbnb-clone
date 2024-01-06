import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useLoginModal from "./loginHook";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../context";

interface FavProps {
  listingId: string;
  user?: any;
}

const useFavorite = ({ user, listingId }: FavProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { setUser } = useGlobalContext();

  const hasFavorited = useMemo(() => {
    const list = user?.favoriteIds || [];
    return list.includes(listingId);
  }, [user, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!user) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/user`, { data: { listingId } });
        } else {
          request = () => axios.put(`/api/user`, { listingId });
        }

        await request();
        router.refresh();
        toast.success("Success");
        axios.get("/api/user").then((res: any) => setUser(res.data));
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
    [user, router, listingId, hasFavorited, loginModal]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
