"use client";
import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "./ReservationsClient";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const ResevationsPage = () => {
  const { user, reservations, setReservations, loading, setLoading } =
    useGlobalContext();

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/reservations`)
      .then((res: any) => setReservations(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  const ownerRes = reservations.filter(
    (res) => res.listing?.userId === user._id
  );

  console.log("reserve", ownerRes);
  if (ownerRes.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservation on your property"
      />
    );
  }

  return <ReservationsClient reservations={ownerRes} currentUser={user} />;
};

export default ResevationsPage;
