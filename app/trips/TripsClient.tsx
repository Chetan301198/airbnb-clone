"use client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/ListingCard";
import { Reservation, User } from "@/app/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface TripsClientProps {
  reservations: Reservation[];
  user?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, user }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {reservations.map((res) => {
          return (
            <ListingCard
              key={res._id}
              //@ts-ignore
              data={res.listing}
              reservation={res}
              actionId={res._id}
              onAction={onCancel}
              disabled={deletingId === res._id}
              actionLabel="Cancel Reservation"
              currentUser={user}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
