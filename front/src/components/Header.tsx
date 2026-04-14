"use client";

import Image from "next/image";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import validatePathName from "@/helpers/validatePathname";

export default function Header(props: any) {
  const [loggedHeaderVisibility, setLoggedHeaderVisibility] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoggedHeaderVisibility(validatePathName(pathname));
  }, [pathname]);

  if (loggedHeaderVisibility) {
    return (
      <div className="fixed z-[999] flex h-[80px] w-full content-center justify-between bg-white">
        <div className="ml-10 mt-2">
          <Logo />
        </div>
        <div className="flex h-[40px] w-fit columns-2 self-center">
          <button className="w-[40px] rounded-full bg-gray-300 px-2 pt-2 text-h1 font-light leading-[0.5em] text-gray-400">
            +
          </button>
          <Image
            className="ml-2 mr-4 rounded-full"
            src="/placeholder.png"
            width="40"
            height="40"
            alt="Imagem de perfil"
          ></Image>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed z-[999] grid h-[80px] w-full place-items-center bg-white">
        <Logo />
      </div>
    );
  }
}
