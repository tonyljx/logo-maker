import React from "react";
import { Icons } from "./icons";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="container   mt-20 flex w-full flex-wrap  gap-10 border-t-2 px-8 py-12">
      <div className="mr-auto flex flex-1 flex-col">
        <p className="flex-1">
          <span>LogoMaker</span>
        </p>
        <div className="flex items-center gap-1">
          <Link
            target="_blank"
            href="https://twitter.com/abc30037274"
            className=" rounded p-2 transition-colors duration-150 hover:bg-slate-200"
          >
            <Icons.X className="h-4 w-4" />
          </Link>
          <Link
            target="_blank"
            href="https://github.com/tonyljx/"
            className="rounded p-2 transition-colors duration-150 hover:bg-slate-200"
          >
            <Icons.gitHub className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 gap-32">
        <div className="flex flex-col gap-3">
          <p className="font-bold">Product</p>
          <Link
            href="https://next.runningpig.top/zh"
            target="_blank"
            className="transition-colors duration-200 hover:text-blue-500"
          >
            RunningDev | Nextjs 模板站点
          </Link>

          <Link
            href="/"
            className="transition-colors duration-200 hover:text-blue-500"
          >
            RunningCode | 刷题效率工具
          </Link>

          <Link
            href="https://www.gpts-store.net/"
            target="_blank"
            className="transition-colors duration-200 hover:text-blue-500"
          >
            GPTs导航站
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-bold">Resources</p>
          <Link
            href="https://nextjs.org/"
            className="transition-colors duration-200 hover:text-blue-500"
          >
            NextJs
          </Link>
          <Link
            href="https://react.dev/"
            className="transition-colors duration-200 hover:text-blue-500"
          >
            React
          </Link>
          <Link
            href="https://ant-design.antgroup.com/index-cn"
            className="transition-colors duration-200 hover:text-blue-500"
          >
            AntD
          </Link>
        </div>
      </div>
    </footer>
  );
}
