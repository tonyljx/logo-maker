import SidebarNav from "@/app/_components/sidebar-nav";
import Header from "@/components/common/header";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: "Personal Settings",
};

type Props = {
  children: React.ReactNode;
};

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Billing",
    href: "/settings/billing",
  },
];

export default function SettingLayout({ children }: Props) {
  return (
    <div className="spcae-y-6 container h-screen p-5 pb-16">
      <Header />

      <div className="mt-10 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
