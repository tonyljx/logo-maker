import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton className="flex h-full min-h-20  w-full items-center justify-center rounded">
        <Loader2 className="animate-spin" />
      </Skeleton>
    </div>
    // <div aria-hidden className={cn("relative aspect-square h-8 w-8 bg-white")}>
    //   <div className="h-full w-full rounded-lg bg-gray-200" />
    // </div>
  );
}
