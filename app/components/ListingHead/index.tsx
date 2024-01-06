"use client";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@/app/constant";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  img: string;
  location: string;
  id: string;
  user?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  img,
  id,
  location,
  user,
}) => {
  const { getByValue } = useCountries();
  const place = getByValue(location);
  return (
    <>
      <Heading
        capitalize
        title={title}
        subtitle={`${place?.region}, ${place?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image src={img} className="object-cover" alt="listing" fill />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} user={user} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
