"use client";
import { User } from "@/app/constant";
import useFavorite from "@/app/hooks/useFavorites";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  user?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, user }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ user, listingId });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      {hasFavorited ? (
        <AiFillHeart size={30} className="fill-primary" />
      ) : (
        <AiOutlineHeart size={30} className="fill-white" />
      )}
    </div>
  );
};

export default HeartButton;
