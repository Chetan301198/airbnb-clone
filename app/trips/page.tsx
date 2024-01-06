"use client";
import EmptyState from "@/app/components/EmptyState";
import TripsClient from "./TripsClient";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const TripsPage = () => {
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

  const userRes = reservations.filter((res) => res.userId === user._id);

  console.log(userRes, reservations);

  if (userRes?.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }
  return <TripsClient reservations={userRes} user={user} />;
};

export default TripsPage;
