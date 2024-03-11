import { Buffer } from "buffer";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { updateOrderPaymentStatus } from "../../../../../server/order";
// Put this in your billing lib and just import the type instead

export async function POST(request: Request) {
  console.log("webhook");
  const text = await request.text();
  const hmac = crypto.createHmac(
    "sha256",
    process.env["LEMON_SQUEEZY_WEBHOOK_SECRET"] || "",
  );
  const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
  const signature = Buffer.from(
    request.headers.get("x-signature") as string,
    "utf8",
  );

  if (!crypto.timingSafeEqual(digest, signature)) {
    return new Response("Invalid signature.", {
      status: 400,
    });
  }

  const payload = JSON.parse(text);

  // 校验签名
  if (!crypto.timingSafeEqual(digest, signature)) {
    console.log("invalid signature");
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
  }

  const userId =
    (payload.meta.custom_data && payload.meta.custom_data.userId) || "";

  if (!userId)
    return NextResponse.json(
      { message: "No userId provided" },
      { status: 403 },
    );

  // 订阅订单
  // const first_subscription_item =
  //   payload.data.attributes.first_subscription_item || null;
  // console.log(
  //   "first_subscription_item  " + JSON.stringify(first_subscription_item),
  // );

  // order订单
  // const first_order_item = payload.data.attributes.first_order_item || null;
  // console.log("first_order_item  " + JSON.stringify(first_order_item));

  /**
   * 拿到lemon的回调数据
   */
  const {
    meta: {
      event_name: eventName,
      custom_data: { email, orderId },
    },
    data,
  } = payload;

  /**
   * 对应事件进行处理
   */

  switch (eventName) {
    case "order_created":
      // https://docs.lemonsqueezy.com/api/orders#the-order-object
      if (!email || !orderId) {
        return NextResponse.json({ message: "failed" }, { status: 400 });
      }

      const payStatus = data?.attributes?.status;

      if (payStatus === "paid") {
        updateOrderPaymentStatus(orderId as string, email as string, 1);
      }
      console.log(`Order created email ${orderId} ${email} ${payStatus}`);
      break;
    case "order_refunded":
      // Do stuff here if you are using orders
      break;
    case "subscription_created":
      console.log(`Subscription created`);
      break;
    case "subscription_cancelled":
    case "subscription_resumed":
    case "subscription_expired":
    case "subscription_paused":
    case "subscription_unpaused":
    case "subscription_payment_failed":
    case "subscription_payment_success":
    case "subscription_payment_recovered":
    case "subscription_updated":
      // Do something with the subscription here, like syncing to your database
      console.log(data);
      break;
    default:
      throw new Error(`🤷‍♀️ Unhandled event: ${eventName}`);
  }
  return NextResponse.json({ message: "success" }, { status: 200 });
}
