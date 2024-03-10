"use client";
import Header from "@/app/_components/header";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {};

export default function BlogPage({}: Props) {
  useEffect(() => {
    const fetchFunc = async () => {
      const resp = await fetch("/api/user");
      if (resp.ok) {
        const res = await resp.json();
        console.log(res?.data);
      }
    };
    fetchFunc();
  }, []);

  const router = useRouter();

  const subscribe = async () => {
    const resp = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: "286113" }),
    });
    if (resp.ok) {
      const res = await resp.json();
      console.log(res);

      toast.success("Ready to redirect to checkout page in 2s");
      setTimeout(() => {
        router.push(res?.data);
      }, 2000);
    }
  };

  return (
    <div className="container h-screen w-screen">
      This is a blog
      <Button onClick={subscribe}>Click Me</Button>
    </div>
  );
}
