import connectMongo from "@/database/conn";
import { listing } from "@/database/model";
import { NextResponse } from "next/server";

export async function GET(req: Request, listId: { params: { id: string } }) {
  await connectMongo();

  const { id } = listId.params;

  const data = await listing.findOne({ _id: id });

  return NextResponse.json(data);
}

export async function DELETE(req: Request, listId: { params: { id: string } }) {
  await connectMongo();

  const { id } = listId.params;

  const data = await listing.deleteOne({ _id: id });

  return NextResponse.json(data);
}
