import React from "react";
import Price from "../../_components/price";
import Header from "@/app/_components/header";

type Props = {};

export default function PricePage({}: Props) {
  return (
    <div className="container">
      <Header />
      <div className="mt-10 min-h-[70vh]">
        <Price />
      </div>
    </div>
  );
}
