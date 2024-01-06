"use client";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/ListingCard";
import { Listing, User } from "@/app/constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface PropertiesClientProps {
  currentUser?: User | null;
  listings: Listing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing._id}
              data={listing}
              currentUser={currentUser}
              actionId={listing._id}
              onAction={onCancel}
              disabled={deletingId === listing._id}
              actionLabel="Delete Listing"
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
