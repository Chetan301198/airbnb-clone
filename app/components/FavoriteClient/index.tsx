"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/ListingCard";
import { Listing, User } from "@/app/constant";

interface FavoriteClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing._id}
              currentUser={currentUser}
              data={listing}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default FavoriteClient;
