"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { AppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { SignOutButton, useClerk } from "@clerk/nextjs";

type Props = {};

const headerRoutes = [
  { url: "/pricing", name: "Price" },
  { url: "/blog", name: "Blog" },
];

export default function Header({}: Props) {
  // const user = await currentUser();
  const { signOut } = useClerk();

  const { user, fetchUserInfo } = useContext(AppContext);

  const pathName = usePathname();

  return (
    <div className="flex justify-between border-b py-3">
      <a href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Vercel Logo"
          className="dark:invert"
          width={36}
          height={36}
          priority
        />
        <span className="text-lg font-semibold">LogoMaker</span>
      </a>
      <div className="flex items-center gap-6">
        <ul className="flex gap-2">
          {headerRoutes.map((item) => (
            <li key={item.url}>
              <Link
                href={item.url}
                className={cn("duration-150 hover:text-primary", {
                  "text-primary": item.url === pathName,
                })}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* <Button>Login</Button> */}
        {user === undefined ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : (
          <>
            {!user ? (
              <a className="cursor-pointer" href="/sign-in">
                <Button>登录</Button>
              </a>
            ) : (
              <div className="flex items-center gap-2">
                {/* <span className="text-base font-bold">Hi</span> */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {user?.avatarUrl ? (
                      <Avatar>
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar>
                        <AvatarImage src="https://avatars.githubusercontent.com/u/36184555?v=4" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-28  md:w-40">
                    <DropdownMenuLabel className="p-1 text-center">
                      Hi {user.userName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem
                  onClick={() => signOut(() => router.push("/"))}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem> */}
                    <DropdownMenuItem>
                      <Link
                        className="flex w-full items-center justify-center gap-1 p-1 text-center"
                        href="/settings"
                      >
                        <Settings className=" h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      {/* <SignOutButton /> */}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
