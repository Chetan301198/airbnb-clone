"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  name: string;
  onClick: (val: string) => void;
  selected: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  name,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(name)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-semibold">{name}</div>
    </div>
  );
};

export default CategoryInput;
