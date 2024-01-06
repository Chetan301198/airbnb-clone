"use client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { Reservation, User } from "@/app/constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import ListingCard from "@/app/components/ListingCard";

interface ReservationsClientProps {
  reservations: Reservation[];
  currentUser?: User | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
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
      <Heading title="Reservation" subtitle="Booking on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reserve) => {
          return (
            <ListingCard
              key={reserve._id}
              //@ts-ignore
              data={reserve.listing}
              reservation={reserve}
              actionId={reserve._id}
              onAction={onCancel}
              disabled={deletingId === reserve._id}
              actionLabel="Cancel Guest Reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
