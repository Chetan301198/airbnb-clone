import connectMongo from "@/database/conn";
import { user } from "@/database/model";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectMongo();

  const session = await getServerSession(authOptions);

  if (session && session.user) {
    const { email } = session.user;
    const main = await user.findOne({ email });
    return NextResponse.json(main);
  } else {
    return NextResponse.json("401 Unauthorized");
  }
}

export async function PUT(req: NextRequest) {
  await connectMongo();
  const session = await getServerSession(authOptions);

  const data = await req.json();

  if (session && session.user) {
    const { email } = session.user;
    const main = await user.findOne({ email });

    main.favoriteIds.push(data.listingId);

    main.save();

    return NextResponse.json(main);
  } else {
    return NextResponse.json("401 Unauthorized");
  }
}

export async function DELETE(req: NextRequest) {
  await connectMongo();
  const session = await getServerSession(authOptions);

  const data = await req.json();

  if (session && session.user) {
    const { email } = session.user;
    const main = await user.findOne({ email });

    main.favoriteIds.pull(data.listingId);

    main.save();

    return NextResponse.json(main);
  } else {
    return NextResponse.json("401 Unauthorized");
  }
}
