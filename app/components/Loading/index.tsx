"use client";
import { TbLoader3 } from "react-icons/tb";

const Loading = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <div className="animate-spin">
        <TbLoader3 size={50} className="text-rose-500" />
      </div>
    </div>
  );
};

export default Loading;
