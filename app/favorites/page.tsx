"use client";
import EmptyState from "@/app/components/EmptyState";
import FavoriteClient from "@/app/components/FavoriteClient";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const FavoritesPage = () => {
  const { user, favorites, setFavorites, loading, setLoading } =
    useGlobalContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/favorites")
      .then((res: any) => setFavorites(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favotites found"
        subtitle="Looks like you have no favorite listing"
      />
    );
  }

  return <FavoriteClient listings={favorites} currentUser={user} />;
};

export default FavoritesPage;
