import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {};

export default function Settings({}: Props) {
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and billing
        </p>
      </div>
      {/* <Separator className="my-6" /> */}
    </div>
  );
}
