"use client";

import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import validatePathName from "@/helpers/validatePathname";

const MainLayout = (props: any) => {
  const [loggedState, setLoggedState] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoggedState(validatePathName(pathname));
  }, [pathname]);

  return (
    <main>
      <SideMenu />
      <div
        className={clsx("h-screen pt-[80px]", {
          "pl-[80px]": loggedState,
        })}
      >
        {props.children}
      </div>
    </main>
  );
};

export default MainLayout;
