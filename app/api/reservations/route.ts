import connectMongo from "@/database/conn";
import { listing, reservation } from "@/database/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();

  const Reservations = await reservation.find({}).populate("listing");

  return NextResponse.json(Reservations);
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json();

  const { listingId } = body;

  const Reservation = await reservation.create({
    ...body,
  });

  const Listing = await listing.findOne({ _id: listingId });

  Listing.reservations.push(Reservation._id);

  return NextResponse.json({ Reservation, Listing });

  // return NextResponse.json(body);
}
