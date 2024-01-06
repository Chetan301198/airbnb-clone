"use client";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import { useEffect, useState } from "react";
import axios from "axios";
import { Listing } from "@/app/constant";
import { useGlobalContext } from "@/app/context";
import Loading from "@/app/components/Loading";

const LisitngPage = ({ params }: { params: { listingId: string } }) => {
  const { user, reservations, loading, setLoading } = useGlobalContext();
  const { listingId } = params;

  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/listing/${listingId}`)
      .then((res) => setListing(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={user}
      />
    </div>
  );
};

export default LisitngPage;
