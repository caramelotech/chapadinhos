"use client";

import validatePathName from "@/helpers/validatePathname";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const [loggedState, setLoggedState] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setLoggedState(validatePathName(pathname));
	}, [pathname]);

	return (
		<main>
			<SideMenu />
			<div
				className={clsx("min-h-screen pt-[72px]", {
					"pl-[72px]": loggedState,
				})}
			>
				{children}
			</div>
		</main>
	);
};

export default MainLayout;
