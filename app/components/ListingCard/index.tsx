"use client";
import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@/app/constant";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { getCurrencyDetails } from "@/app/hooks/useCurrencies";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.location);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const currencyDetail = getCurrencyDetails({
    fromCurrency: data?.currency || "USD",
    price: Number(price),
  });

  console.log(currencyDetail);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data._id}`)}
      className="col-span-1 cursor-pointer group border-[1px] border-neutral-300 rounded-xl p-1.5 bg-[#fefefe] shadow-sm"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-lg">
          <Image
            src={data.imageSrc}
            alt="listing-img"
            fill
            className="h-full w-full transition group-hover:scale-110 object-cover"
          />
          <div className="absolute top-3 right-3 z-10">
            <HeartButton listingId={data._id} user={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg px-2">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500 px-2">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1 px-2">
          <div className="font-semibold">
            {currencyDetail?.symbol}
            {currencyDetail?.value}
          </div>
          {!reservation && <div className="font-light">/ Night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            label={actionLabel}
            onClick={handleCancel}
            small
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
