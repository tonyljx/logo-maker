import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createUserIfNotExists } from "../../../../server/user";

// const requestJson = await request.json();

// 创建一个新的 Promise 来处理 2 秒的等待
// await new Promise((resolve) => setTimeout(resolve, 2000)); // 等待 2 秒

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user || !user?.emailAddresses || user?.emailAddresses.length === 0) {
    return NextResponse.json(
      { message: "not login", code: 401 },
      { status: 401 },
    );
  }
  const data = {
    email: user.emailAddresses[0].emailAddress,
    userName: user.username || `${user.emailAddresses[0].emailAddress}`,
    avatarUrl: user.imageUrl,
    createdAt: new Date(),
    status: 0,
  };

  // console.log("user data :", data);

  /**
   * 同步到自己的db, 如果没有的话
   */
  const res = await createUserIfNotExists(data);

  console.log("res ", res);

  try {
    return new Response(JSON.stringify({ ...res }), { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}
