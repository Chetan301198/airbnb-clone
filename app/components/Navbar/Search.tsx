"use client";
import useSearchModal from "@/app/hooks/searchHook";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const { getByValue } = useCountries();

  const location = params?.get("location");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (location) {
      return getByValue(location as string)?.label;
    }
    return "Anywhere";
  }, [location, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border w-full md:w-auto py-2 rounded-full cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="flex items-center flex-row justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 text-center flex-1 border-x-[1px]">
          {durationLabel}
        </div>
        <div className="text-sm text-gray-600 font-semibold pl-6 pr-2 flex flex-row gap-3 items-center">
          <div className="hidden md:block">{guestLabel}</div>
          <div className="bg-primary p-2 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
