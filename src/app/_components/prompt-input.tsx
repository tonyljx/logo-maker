"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {};

export default function PromptInput({}: Props) {
  const [inputV, setInputValue] = useState("");
  const handleInput = () => {
    toast.success(inputV);
  };
  return (
    <div className="flex max-w-xl gap-3 self-center md:max-w-3xl">
      <Input
        value={inputV}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-[20rem] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      <Button
        variant="secondary"
        className="duration-150 hover:bg-slate-100 hover:text-primary"
        onClick={handleInput}
      >
        Logo It
      </Button>
    </div>
  );
}
