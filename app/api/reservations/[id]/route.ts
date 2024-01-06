import connectMongo from "@/database/conn";
import { listing, reservation } from "@/database/model";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function DELETE(req: Request, data: { params: { id: IParams } }) {
  await connectMongo();

  const { id } = data.params;

  const removeReserve = await reservation.findOneAndDelete({ _id: id });

  const list = await listing.findOne({ _id: removeReserve.listingId });

  list.reservations.pull(removeReserve._id);

  return NextResponse.json(removeReserve);
}
