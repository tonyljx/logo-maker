import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await currentUser();
  const reqJson = await request.json();
  // 1: 校验: 用户不登录的话, 直接报错
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return NextResponse.json({ message: "not authenticated" }, { status: 401 });
  }

  const prompt = reqJson?.prompt;
  if (!prompt) {
    return NextResponse.json({ message: "prompt null" }, { status: 400 });
  }
  // todo 限流

  // 3 api
  // POST request to Replicate to start the image restoration generation process
  //  https://replicate.com/fofr/sticker-maker?output=json&input=http
  let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + process.env.REPLICATE_API_KEY,
    },
    body: JSON.stringify({
      version:
        "6443cc831f51eb01333f50b757157411d7cadb6215144cc721e3688b70004ad0",
      input: { steps: 20, width: 1024, height: 1024, prompt: prompt },
    }),
  });
  let jsonStartResponse = await startResponse.json();
  console.log(jsonStartResponse);
  let endpointUrl = jsonStartResponse.urls.get;

  // 4 sticker image url
  // GET request to get the status of the image restoration process & return the result when it's ready
  let stickerLogo: string | null = null;
  while (!stickerLogo) {
    // Loop in 1s intervals until the alt text is ready
    console.log("polling for result...");
    let finalResponse = await fetch(endpointUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });
    let jsonFinalResponse = await finalResponse.json();

    if (jsonFinalResponse.status === "succeeded") {
      stickerLogo = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return NextResponse.json({ imgUrl: stickerLogo }, { status: 200 });
}
