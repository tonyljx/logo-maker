import Header from "@/components/common/header";
import React from "react";

type Props = {};

export default function BlogPage({}: Props) {
  return (
    <div className="container h-screen w-screen">
      <Header />
      This is a blog
    </div>
  );
}
