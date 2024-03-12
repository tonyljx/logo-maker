import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { fetchImage } from "../../../../server/img";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user || !user?.emailAddresses || user?.emailAddresses.length === 0) {
    return NextResponse.json(
      { message: "not login", code: 401 },
      { status: 401 },
    );
  }
  const email = user.emailAddresses[0].emailAddress;
  const res = await fetchImage(email);

  try {
    return new Response(JSON.stringify({ res }), {
      status: 200,
    });
  } catch (error) {
    return Response.json({ error });
  }
}
