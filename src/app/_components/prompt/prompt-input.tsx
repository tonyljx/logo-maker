"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AppContext } from "@/contexts/AppContext";
import { Confetti } from "@/lib/confetti";
import { Loader2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

export default function PromptInput({}: Props) {
  const { userStatus } = useContext(AppContext);
  const [inputV, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const handleInput = () => {
    toast.success(inputV);
  };
  //
  const [limit, setLimit] = useState(2);

  // generate photo
  async function generatePhoto(prompt: string) {
    try {
      if (userStatus?.status === "unsubscribed" || limit == 0) {
        toast.error(
          "You are not subscribed and use out of quota, please try again later",
        );
        return;
      }
      toast.success(`Prompt: inputV`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      let newPhoto = await res.json();
      if (res.status !== 200) {
        const errorMessage = await res.json();
        toast.error(errorMessage);
      }
      setImgUrl(newPhoto?.imgUrl[0]);
      setLimit((prev) => prev - 1);
      toast.success(`Total free credit 2, remaining credit ${limit}`);
    } catch (error) {
      toast.error("error generating image");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="mx-auto flex max-w-xl gap-3 md:max-w-3xl">
        <Input
          value={inputV}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[20rem] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        <Button
          variant="secondary"
          className="flex gap-2 duration-150 hover:bg-slate-100 hover:text-primary"
          onClick={() => generatePhoto(inputV)}
          disabled={loading || limit === 0}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Logo It
        </Button>
      </div>

      {loading && (
        <Skeleton className="mt-10 flex h-[10rem] w-[10rem] items-center justify-center self-center rounded bg-purple-200">
          <LoaderCircle className="h-8 w-8 animate-spin stroke-orange-50 " />
        </Skeleton>
      )}

      <p className="self-center font-semibold">Free Quota {limit}</p>

      {imgUrl && (
        <Image
          alt="generated img"
          src={imgUrl}
          className="self-center rounded"
          width={500}
          height={500}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          onLoad={() => Confetti()}
        />
      )}
    </div>
  );
}
