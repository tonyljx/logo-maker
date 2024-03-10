import { prisma } from "./db";

/**
 * 查询用户credits
 * @param userId
 * @returns
 */
async function queryUserCredits(
  userId: number,
): Promise<{ isSubscriber: boolean; oneTimeCredits: number }> {
  // 检查是否存在有效的订阅
  const subscription = await prisma.order.findFirst({
    where: {
      userId,
      type: {
        not: "one-time",
      },
      expiredAt: {
        gt: new Date(),
      },
      isPaid: true,
    },
  });

  // 计算一次性购买的Credits总和
  const { _sum } = await prisma.order.aggregate({
    _sum: {
      credits: true,
    },
    where: {
      userId,
      type: "one-time",
      isPaid: true,
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
  userId: number,
  creditsToDeduct: number,
): Promise<void> {
  const orders = await prisma.order.findMany({
    where: {
      userId,
      type: "one-time",
      credits: {
        gt: 0,
      },
      isPaid: true,
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
          id: order.id,
        },
        data: {
          credits: availableCredits - creditsToDeduct,
        },
      });
      break;
    } else {
      await prisma.order.update({
        where: {
          id: order.id,
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
