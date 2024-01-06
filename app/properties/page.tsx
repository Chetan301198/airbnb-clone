"use client";
import { useGlobalContext } from "../context";
import PropertiesClient from "./PropertiesClient";
import EmptyState from "@/app/components/EmptyState";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const PropertyPage = () => {
  const { listings, user, setListings, loading, setLoading } =
    useGlobalContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/listing`)
      .then((res: any) => setListings(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (loading) {
    return <Loading />;
  }

  const ownListings = listings.filter((list) => list.userId === user._id);

  if (ownListings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return <PropertiesClient listings={ownListings} />;
};

export default PropertyPage;
