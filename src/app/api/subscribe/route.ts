/**
 * 1、校验是否登录, 不登录返回报错
 * @param request
 */

import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { createOrder } from "../../../../server/order";

// 定义索引类型，以接受任何字符串作为键，值为string或undefined
interface TypeToVariantMap {
  [key: string]: string | undefined;
}

const typeToVariant: TypeToVariantMap = {
  month: process.env.LEMON_SQUEEZY_VARIANT_MONTH!,
  quarter: process.env.LEMON_SQUEEZY_VARIANT_QUARTER!,
  year: process.env.LEMON_SQUEEZY_VARIANT_YEAR!,
};

export async function POST(request: Request) {
  const user = await currentUser();
  const reqJson = await request.json();
  // 1.1: 校验: 用户不登录的话, 直接报错
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return NextResponse.json({ message: "not authenticated" }, { status: 401 });
  }

  // 1.2: 校验: 获取用户的productId, 对应到variantId, 如果 productId为空, 报错

  const type = reqJson["type"] as string;
  const productId = typeToVariant[type];
  if (!productId) {
    return NextResponse.json({ message: "productId null" }, { status: 400 });
  }

  // 2.1: 创建订单
  const order = await createOrder(
    user.emailAddresses[0].emailAddress,
    type,
    new Date(),
    0,
  );

  const lemonUrl = process.env.LEMON_SQUEEZY_HOST!!;
  const lemonStoreId = process.env.LEMON_SQUEEZY_STORE_ID;

  // console.log(
  //   `${lemonUrl} ${lemonStoreId} ${productId} ${process.env.LEMON_SQUEEZY_API_KEY}`,
  // );
  // console.log( user.emailAddresses[0].emailAddress);
  const lemonParams = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          email: user.emailAddresses[0].emailAddress,
          name: user.username,
          custom: {
            userId: user.id,
            name: user.username,
            email: user.emailAddresses[0].emailAddress,
            orderId: order.orderId,
          },
        },
        product_options: {
          // redirect_url: "https://1g98s5p6-3000.asse.devtunnels.ms/",
        },
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: lemonStoreId,
          },
        },
        variant: {
          data: {
            type: "variants",
            id: productId,
          },
        },
      },
    },
  };

  // console.log(JSON.stringify(lemonParams));

  const res = await fetch(`${lemonUrl}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify(lemonParams),
  });
  // console.log(res.status);

  if (!res.ok) {
    const errorText = await res.text(); // 或者使用 res.json() 如果错误响应是JSON格式
    console.error("Fetch error:", errorText);
    return NextResponse.json({ message: "error fetch lemon" }, { status: 500 });
  }
  const respData = await res.json();
  // console.log(respData);

  return NextResponse.json(
    { message: "success", data: respData?.data?.attributes?.url },
    { status: 200 },
  );
}
