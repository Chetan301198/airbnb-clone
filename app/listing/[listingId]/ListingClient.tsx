"use client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/ListingHead";
import { categories } from "@/app/components/Navbar/Categories";
import { Listing, Reservation, User } from "@/app/constant";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/hooks/loginHook";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/ListingReservation";
import { Range } from "react-date-range";
import { useGlobalContext } from "@/app/context";

const initDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientPage {
  reservations?: Reservation[];
  listing: Listing;
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientPage> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const { setReservations } = useGlobalContext();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initDateRange);

  const onCreateListing = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    const data = {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?._id,
      userId: currentUser?._id,
      user: currentUser?._id,
      listing: listing?._id,
    };

    axios
      .post("/api/reservations", data)
      .then(() => {
        toast.success("Listing Reserved!");
        setDateRange(initDateRange);
        axios.get(`/api/reservations`).then((res) => setReservations(res.data));
        router.push("/trips");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, loginModal, dateRange, listing?._id, currentUser]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            id={listing._id}
            img={listing.imageSrc}
            location={listing.location}
            user={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              category={category}
              user={currentUser}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              locationValue={listing.location}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateListing}
                disabledDates={disabledDates}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
