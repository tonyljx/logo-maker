import { downloadAndUploadImage } from "@/lib/s3";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { insertImg } from "../../../../server/img";

export async function POST(request: Request) {
  const user = await currentUser();
  const reqJson = await request.json();
  // 1: 校验: 用户不登录的话, 直接报错
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return NextResponse.json({ message: "not authenticated" }, { status: 401 });
  }

  const prompt = reqJson?.prompt as string | null;
  if (!prompt) {
    return NextResponse.json({ message: "prompt null" }, { status: 400 });
  }
  // todo 限流

  // 3 api
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
      input: { steps: 20, width: 512, height: 512, prompt: prompt },
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
    // console.log("最终结果: " + jsonFinalResponse);
    if (jsonFinalResponse.status === "succeeded") {
      stickerLogo = jsonFinalResponse.output[0];
    } else if (jsonFinalResponse.status === "failed") {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  if (!stickerLogo) {
    return NextResponse.json({ message: "url null" }, { status: 501 });
  }

  // 获取replicate url 然后上传到服务器
  const raw_img_url = stickerLogo;
  const img_name = encodeURIComponent(prompt);
  const s3_img = await downloadAndUploadImage(
    raw_img_url,
    process.env.AWS_BUCKET || "logomaker",
    `covers/${img_name}.png`,
  );
  const img_url = s3_img.Location;
  await insertImg({
    createdAt: new Date(),
    src: img_url,
    userEmail: user?.emailAddresses[0].emailAddress || "",
    prompt: prompt,
  });

  return NextResponse.json({ imgUrl: stickerLogo }, { status: 200 });
}
