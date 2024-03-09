"use client";
import { getCurrencyDetails } from "@/app/hooks/useCurrencies";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <p className="text-neutral-500 font-semibold text-3xl absolute top-3 left-3">
          {getCurrencyDetails({})?.symbol}
        </p>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
        className={` peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-pointer ${
          formatPrice ? "pl-9" : "pl-4"
        } ${
          errors && errors[id]
            ? "border-red-500 focus:border-red-500"
            : "border-neutral-300 focus:border-black"
        }`}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors && errors[id] ? "text-red-500" : "border-zinc-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
