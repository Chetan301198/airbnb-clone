"use client";
import useCountries from "@/app/hooks/useCountries";
import { IconType } from "react-icons";
import Image from "next/image";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  user?: any;
  roomCount: number;
  guestCount: number;
  locationValue: string;
  bathroomCount: number;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const Map = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  guestCount,
  bathroomCount,
  roomCount,
  locationValue,
  category,
  description,
}) => {
  const { getByValue } = useCountries();
  const cordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Image
            src={user?.image ? user?.image : "/images/placeholder.jpg"}
            alt="Avatar"
            height={30}
            width={30}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} Guests</div>
          <div>{roomCount} Rooms</div>
          <div>{bathroomCount} Bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-4">
            <category.icon size={40} className="text-neutral-600" />
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{category.label}</div>
              <div className="font-light text-neutral-500">
                {category.description}
              </div>
            </div>
          </div>
        </div>
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={cordinates} />
    </div>
  );
};

export default ListingInfo;
