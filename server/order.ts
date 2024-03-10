import { Order } from "../types/order";
import { prisma } from "./db";

/**
 * 创建订单
 * @param userId
 * @param type
 * @param credits
 * @returns
 */
async function createOrder(
  userId: number,
  type: string,
  credits?: number,
): Promise<Order> {
  return await prisma.order.create({
    data: {
      userId,
      type,
      credits,
      isPaid: false, // 新创建的订单，支付状态为未支付
      // 如果是订阅类型，可以在这里根据type计算并设置expiredAt
    },
  });
}

/**
 * for 回调
 * 更新用户的记录
 * @param orderId
 * @param isPaymentSuccessful
 * @returns
 */
async function updateOrderPaymentStatus(
  orderId: number,
  isPaymentSuccessful: boolean,
): Promise<Order> {
  return await prisma.order.update({
    where: { id: orderId },
    data: { isPaid: isPaymentSuccessful },
  });
}
