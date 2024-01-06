"use client";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";

interface CategotyProps {
  title: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategotyProps> = ({
  title,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: title,
    };

    if (params?.get("category") === title) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
    // window.location.href = url;
  }, [title, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-rose-500 transition cursor-pointer ${
        selected
          ? "text-rose-500 border-b-rose-500"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{title}</div>
    </div>
  );
};

export default CategoryBox;