import connectMongo from "@/database/conn";
import { listing } from "@/database/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongo();

  const data = await listing.find();

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  const userInfo = await fetch("https://ipapi.co/json");

  const res = await userInfo.json();

  const listingData = await listing.create({
    guestCount,
    category,
    roomCount,
    location: location.value,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
    currency: res.currency,
  });

  return NextResponse.json({
    message: "Listing added successfully",
    data: listingData,
  });
}
