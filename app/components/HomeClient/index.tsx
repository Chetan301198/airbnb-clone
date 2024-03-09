"use client";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/ListingCard";
import { IListingParams } from "../../constant";
import { useGlobalContext } from "@/app/context";
import { useEffect } from "react";
import axios from "axios";
import SkeletonLoading from "../SkeletonLoading";

interface HomeProps {
  searchParams: IListingParams;
}

const HomeClient = ({ searchParams }: HomeProps) => {
  const {
    category,
    startDate,
    endDate,
    roomCount,
    guestCount,
    bathroomCount,
    location,
  } = searchParams;

  const { user, listings, setListings, loading, setLoading } =
    useGlobalContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/listing")
      .then((res: any) => setListings(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container>
        <SkeletonLoading />
      </Container>
    );
  }

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {listings.length > 0 &&
          listings
            .filter((list) => {
              if (category) {
                return list.category === category;
              }
              return list;
            })
            .filter((list) => {
              if (roomCount) {
                return list.roomCount === roomCount;
              }
              return list;
            })
            .filter((list) => {
              if (guestCount) {
                return list.guestCount === guestCount;
              }
              return list;
            })
            .filter((list) => {
              if (location) {
                return list.location === location;
              }
              return list;
            })
            .filter((list) => {
              if (bathroomCount) {
                return list.bathroomCount === bathroomCount;
              }
              return list;
            })
            .map((listing: any) => {
              return (
                <ListingCard
                  key={listing._id}
                  data={listing}
                  currentUser={user}
                />
              );
            })}
      </div>
    </Container>
  );
};

export default HomeClient;
