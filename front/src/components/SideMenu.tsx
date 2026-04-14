"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import validatePathName from "@/helpers/validatePathname";

const SideMenu = (props: any) => {
  const [sideMenuVisibility, setSideMenuVisibility] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSideMenuVisibility(validatePathName(pathname));
  }, [pathname]);

  function renderizaSideMenu() {
    if (sideMenuVisibility) {
      return (
        <div className="fixed z-[998] h-screen w-[75px] bg-black">
          <div className="flex h-screen flex-col pt-[80px]">
            <Link
              href="/dashboard"
              className="grid h-[75px] place-content-center text-gray-50 hover:bg-gray-800"
            >
              <span>H</span>
            </Link>
            <Link
              href="/profile"
              className="grid h-[75px] place-content-center text-gray-50 hover:bg-gray-800"
            >
              <span>P</span>
            </Link>
            <Link
              href="/history"
              className="grid h-[75px] place-content-center text-gray-50 hover:bg-gray-800"
            >
              <span>H</span>
            </Link>
            <div className="flex grow flex-row justify-between"></div>
            <Link
              href="/configuration"
              className="grid h-[75px] place-content-center text-gray-50 hover:bg-gray-800"
            >
              <span>C</span>
            </Link>
          </div>
        </div>
      );
    }
    return;
  }

  return renderizaSideMenu();
};

export default SideMenu;
