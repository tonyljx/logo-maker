"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "../../components/ui/button";
import { UserButton, currentUser, useClerk } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { AppContext } from "@/contexts/AppContext";
type Props = {};

export default function Header({}: Props) {
  // const user = await currentUser();
  // const { signOut } = useClerk();
  // const router = useRouter();
  const { user } = useContext(AppContext);
  console.log("header user", user);

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
          <li>
            <Link href="/pricing" className="duration-150 hover:text-primary">
              Price
            </Link>
          </li>
          <li>
            <Link href="/blog" className="duration-150 hover:text-primary">
              blog
            </Link>
          </li>
        </ul>
        {/* <Button>Login</Button> */}
        {!user ? (
          <a className="cursor-pointer" href="/sign-in">
            <Button>登录</Button>
          </a>
        ) : (
          <div className="flex items-center gap-2">
            {/* <span className="text-base font-bold">Hi</span> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                {user?.imageUrl ? (
                  <Avatar>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/36184555?v=4" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-20">
                {/* <DropdownMenuItem
                  onClick={() => signOut(() => router.push("/"))}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  Hi
                  {/* <SignOutButton /> */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
