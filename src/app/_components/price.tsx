"use client";
import { CheckCircleIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PriceProps extends React.HTMLProps<HTMLDivElement> {
  // 你的自定义属性
}

export default function Price({ className }: PriceProps) {
  // const [isMonth, setIsMonth] = useState(true);

  const sliderVariants = {
    monthly: { x: 0 },
    annually: { x: "95%" },
  };

  const priceStrategy = [
    {
      plan: "月度计划",
      price: "¥58",
      desc: "Free to use",
      features: ["无限视频生成", "高清视频导出"],
    },
    {
      plan: "季度计划",
      price: "¥98",
      desc: " 现在只要 98元/季度 (原价122元,立省24元!)",
      features: [
        "所有月度计划计划",
        "优先视频处理队列",
        "提示词引导教程, 激发视频创意",
      ],

      popular: true,
    },
    {
      plan: "年度计划",
      price: "¥298",
      desc: "原价696元, 惊人的6折优惠!",
      features: [
        "包含月度和季度计划的所有功能",
        "独家访问新功能",
        "个性化视频建议",
      ],
    },
  ];

  const yearPriceStrategy = [
    {
      plan: "Standard",
      price: "free",
      desc: "Free to use",
      features: [
        "1 macOS device",
        "Pay once, use forever",
        "All screen Studio features",
        "1 year of updates",
      ],
    },
    {
      plan: "Extended",
      price: "$7.99",
      desc: "Great for multi-devices setups & small teams.",
      features: [
        "3 macOS device",
        "Pay once, use forever",
        "All screen Studio features",
        "1 year of updates",
      ],
      popular: true,
    },
    {
      plan: "Pro",
      price: "$11.99",
      desc: "Pay per seat for your team.",
      features: [
        "unlimited macOS device",
        "All screen Studio features",
        "App updates during the subscription",
      ],
    },
  ];

  return (
    <div className={cn(className)}>
      <h2 className="animate-fade-up text-center text-3xl font-bold tracking-tight lg:text-5xl">
        开启您的创意之旅
      </h2>

      <p className="mt-6 text-center text-[16px] leading-7 text-muted-foreground">
        选择你的计划, 马上获取无限视频创作能力, 解锁 AI 视频的潜力
      </p>

      {/* month or year plan */}

      <div className="mt-12 grid w-full gap-8 md:grid-cols-3  md:gap-6">
        {/* plan */}
        {priceStrategy.map((item) => (
          <div
            key={item.plan}
            className={cn(
              "relative flex flex-col gap-2 rounded-lg border bg-slate-100 px-8 py-10 transition-all duration-150 hover:-translate-y-2 hover:shadow-lg",
              {
                "border-2 border-primary": item.popular,
              },
            )}
          >
            {item.popular && (
              <span className="absolute right-0 top-0 rounded bg-primary px-3 py-1 text-white">
                热门方案
              </span>
            )}
            <h3 className=" bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-2xl font-semibold text-transparent">
              {item.plan}
            </h3>
            <p className="text-3xl font-bold">{item.price}</p>
            <p className="text-muted-foreground">{item.desc}</p>

            {/* features */}
            <ul className="mb-6 mt-10 flex-1 space-y-3">
              {item.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2">
                  <CheckCircleIcon className="text-emerald-500" /> {feature}
                </li>
              ))}
            </ul>

            <Button>Order</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
