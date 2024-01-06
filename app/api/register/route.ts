import connectMongo from "@/database/conn";
import { user } from "@/database/model";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectMongo();

  const { email, name, password } = await request.json();

  const hashPassword = await bcryptjs.hash(password, 12);

  const newUser = await user.create({
    email,
    password: hashPassword,
    name,
  });

  return NextResponse.json({ message: "User register" });
}
