import { Order, OrderReq } from "../types/order";
import { UserStatus } from "../types/user";
import { prisma } from "./db";
import dayjs from "dayjs";
// 更新订单有效期的函数
function updateOrderExpiry(order: OrderReq): void {
  let expiredAtDayjs; // 使用dayjs临时处理日期

  switch (order.type) {
    case "month":
      expiredAtDayjs = dayjs(order.createdAt).add(1, "month");
      break;
    case "quarter":
      expiredAtDayjs = dayjs(order.createdAt).add(3, "month");
      break;
    case "year":
      expiredAtDayjs = dayjs(order.createdAt).add(1, "year");
      break;
    case "one-time":
      // 一次性订单，不更新expiredAt或者设置为特定值
      expiredAtDayjs = null;
      break;
    default:
      console.log("Unknown order type");
      return; // 如果类型未知，则不进行更新
  }

  // 更新expiredAt属性，如果expiredAtDayjs不为null，则转换为Date类型
  console.log(expiredAtDayjs?.toDate());
  order.expiredAt = expiredAtDayjs ? expiredAtDayjs.toDate() : null;
}

/**
 * 创建订单
 * @param userId
 * @param type
 * @param credits
 * @returns
 */
export async function createOrder(
  userEmail: string,
  type: string,
  createdAt: Date,
  credits?: number,
): Promise<Order> {
  const req = {
    data: {
      userEmail,
      type,
      createdAt: createdAt,
      credits,
      isPaid: 0, // 新创建的订单，支付状态为未支付
      // 如果是订阅类型，可以在这里根据type计算并设置expiredAt
    },
  };
  // 根据type和创建时间, 更新过期时间
  updateOrderExpiry(req.data);
  return await prisma.order.create(req);
}

/**
 * for 回调
 * 更新用户的付款状态
 * @param orderId
 * @param payStatus 0是未成功, 1是成功
 * @returns
 */
export async function updateOrderPaymentStatus(
  orderId: string | null,
  userEmail: string,
  payStatus: number,
): Promise<Order | null> {
  if (!orderId) {
    return null;
  }
  return await prisma.order.update({
    where: { orderId: orderId, userEmail: userEmail },
    data: { isPaid: payStatus },
  });
}

/**
 * 函数调用的时候需要确认是否是会员 (todo: credits)
 * 到时候一起返回给前端
 */

export async function getUserStatus(userEmail: string): Promise<UserStatus> {
  const currentDate = new Date();

  // 查找指定用户的所有已支付的、未过期的订单
  const orders = await prisma.order.findMany({
    where: {
      userEmail: userEmail,
      isPaid: 1,
      expiredAt: {
        gt: currentDate, // 过滤出过期时间大于当前时间的订单
      },
    },
    orderBy: {
      createdAt: "desc", // 按创建时间降序排序
    },
  });

  // 检查是否存在有效的订单
  if (orders.length > 0) {
    // 未来扩展
    // 这里仅检查最新的订单，因为它们是按创建时间降序排序的
    // const latestOrder = orders[0];
    // todo
    // 针对"one-time"类型订单的特殊处理（如果需要）
    // if (latestOrder.type === 'one-time') {
    //   // 对于"one-time"订单，你需要根据你的业务逻辑来决定如何处理
    //   // 比如，你可能有一个特定的有效期规则
    //   // 这里假设"one-time"订单总是有效的
    //   return true;
    // }

    // 对于订阅类型订单，已经通过查询保证了它们在有效期内
    const latestOrder = orders[0];
    let status: UserStatus["status"] = "unsubscribed";

    switch (latestOrder.type) {
      case "month":
      case "quarter":
      case "year":
      case "one-time":
        status = latestOrder.type;
        break;
      default:
        // 如果订单类型不是预期之一，可以按未订阅处理或记录错误
        status = "unsubscribed";
    }

    return {
      status: status,
      expiredAt: latestOrder.expiredAt,
    };
  }

  // 如果没有找到任何有效的订单，则会员不在有效期内
  return { status: "unsubscribed", expiredAt: null };
}
