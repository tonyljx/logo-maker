"use client";
import { CheckCircleIcon, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PriceProps extends React.HTMLProps<HTMLDivElement> {
  // 你的自定义属性
}

export default function Price({ className }: PriceProps) {
  // 环境变量读取lemon中的月，季度，年度id

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const sliderVariants = {
    monthly: { x: 0 },
    annually: { x: "95%" },
  };

  const priceStrategy = [
    {
      plan: "Month Plan",
      price: "$9.9",
      desc: "basic month plan",
      features: ["generate 10 logos daily"],
      productId: "month",
    },
    {
      plan: "Quarter Plan",
      price: "$23.99",
      desc: "Most popular plan",
      features: [
        "generate 20 images daily for 3 months",
        "Prompt tutorials are available",
      ],
      popular: true,
      productId: "quarter",
    },
    {
      plan: "Year Plan",
      price: "$109",
      desc: "Join our year program",
      features: [
        "generate 30 images daily for 3 months",
        "Prompt tutorials are available",
        "Addition 2 months are free",
      ],
      productId: "year",
    },
  ];

  const subscribe = async (productId: string) => {
    try {
      setLoading(true);
      const resp = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: productId }),
      });
      if (resp.ok) {
        const res = await resp.json();
        console.log(res);

        // LemonSqueezy.Url.Open(res?.data);
        toast.success("Ready to redirect to checkout page in 2s");
        setTimeout(() => {
          router.push(res?.data);
        }, 1000);
      }
    } catch (error) {
      toast.error("error try again later");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(className)}>
      <h2 className="animate-fade-up text-center text-3xl font-bold tracking-tight lg:text-5xl">
        开启您的创意之旅
      </h2>

      <p className="mt-6 text-center text-[16px] leading-7 text-muted-foreground">
        选择你的计划, 马上获取无限创作能力, 解锁 AI 生成Logo的潜力
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

            <Button
              onClick={() => subscribe(item.productId)}
              className="flex gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Order
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
