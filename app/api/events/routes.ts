import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://corp-events.gt.tc/wp-json/tribe/events/v1/events",
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        // Prevent caching issues
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
