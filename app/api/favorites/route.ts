import { NextResponse } from "next/server";
import connectMongo from "@/database/conn";
import { user } from "@/database/model";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function GET() {
  await connectMongo();

  const session = await getServerSession(authOptions);

  if (session && session.user) {
    const { email } = session.user;
    const main = await user.findOne({ email }).populate("favoriteIds");
    return NextResponse.json(main.favoriteIds);
  } else {
    return NextResponse.json("401 Unauthorized");
  }
}
