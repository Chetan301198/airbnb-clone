"use client";
import { Range } from "react-date-range";
import Calendar from "../Input/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  dateRange: Range;
  symbol?: string;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  disabledDates,
  disabled,
  onChangeDate,
  onSubmit,
  dateRange,
  symbol,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          {symbol} {price}
        </div>
        <div className="font-light text-neutral-600">/ Night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDate={disabledDates}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>
          {symbol || "$"} {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
