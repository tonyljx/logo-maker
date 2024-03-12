import { prisma } from "./db";

/**
 * 查询用户credits
 * @param userId
 * @returns
 */
async function queryUserCredits(
  email: string,
): Promise<{ isSubscriber: boolean; oneTimeCredits: number }> {
  // 检查是否存在有效的订阅
  const subscription = await prisma.order.findFirst({
    where: {
      userEmail: email,
      type: {
        not: "one-time",
      },
      expiredAt: {
        gt: new Date(),
      },
      isPaid: 1,
    },
  });

  // 计算一次性购买的Credits总和
  const { _sum } = await prisma.order.aggregate({
    _sum: {
      credits: true,
    },
    where: {
      userEmail: email,
      type: "one-time",
      isPaid: 1,
    },
  });

  return {
    isSubscriber: !!subscription,
    oneTimeCredits: _sum.credits || 0,
  };
}

/**
 * 扣减用户credit
 * @param prisma
 * @param userId
 * @param creditsToDeduct
 */

async function deductCredits(
  userEmail: string,
  creditsToDeduct: number,
): Promise<void> {
  const orders = await prisma.order.findMany({
    where: {
      userEmail,
      type: "one-time",
      credits: {
        gt: 0,
      },
      isPaid: 1,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  for (const order of orders) {
    if (creditsToDeduct <= 0) break;

    const availableCredits = order.credits ?? 0;
    if (availableCredits >= creditsToDeduct) {
      await prisma.order.update({
        where: {
          orderId: order.orderId,
        },
        data: {
          credits: availableCredits - creditsToDeduct,
        },
      });
      break;
    } else {
      await prisma.order.update({
        where: {
          orderId: order.orderId,
        },
        data: {
          credits: 0,
        },
      });
      creditsToDeduct -= availableCredits;
    }
  }

  if (creditsToDeduct > 0) {
    throw new Error("Insufficient credits");
  }
}
