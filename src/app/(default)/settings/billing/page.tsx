"use client";
import React, { useContext } from "react";

type Props = {};
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppContext } from "@/contexts/AppContext";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";

export default function BillingPage({}: Props) {
  const { userStatus } = useContext(AppContext);
  const expiredAt = userStatus?.expiredAt;
  // 使用 dayjs 来格式化日期
  const formattedDate = dayjs(expiredAt).format("MMMM D, YYYY");
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
      <p className="text-muted-foreground">Your personal profile</p>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Billing Page</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <p>Card Content</p> */}
          {/* <p>{JSON.stringify(userStatus)}</p> */}
          {userStatus?.status === "unsubscribed" ? (
            "You are not subscribed"
          ) : (
            <div>
              You are subscribed as{" "}
              <span className="font-semibold text-primary">
                {userStatus?.status}
              </span>{" "}
              plan
            </div>
          )}
        </CardContent>
        <CardFooter>
          Expired Date:{" "}
          <div className="ml-2 font-semibold">{formattedDate}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
