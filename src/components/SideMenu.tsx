"use client";

import validatePathName from "@/helpers/validatePathname";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const navItems = [
	{
		href: "/dashboard",
		label: "Início",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				aria-hidden="true"
			>
				<path
					d="M3 10.5L10 3.5L17 10.5V17H13V13H7V17H3V10.5Z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		href: "/profile",
		label: "Perfil",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				aria-hidden="true"
			>
				<circle
					cx="10"
					cy="7.5"
					r="3"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<path
					d="M3.5 17c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
		),
	},
	{
		href: "/history",
		label: "Histórico",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				aria-hidden="true"
			>
				<circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
				<path
					d="M10 6v4l2.5 2.5"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
];

const configItem = {
	href: "/configuration",
	label: "Configurações",
	icon: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			aria-hidden="true"
		>
			<circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
			<path
				d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.42 1.42M13.88 13.88l1.42 1.42M4.7 15.3l1.42-1.42M13.88 6.12l1.42-1.42"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	),
};

const SideMenu = () => {
	const [visible, setVisible] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setVisible(validatePathName(pathname));
	}, [pathname]);

	if (!visible) return null;

	return (
		<nav className="fixed z-[998] flex h-screen w-[72px] flex-col bg-surface-low pt-[72px]">
			<div className="flex flex-1 flex-col items-center gap-1 py-4">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							title={item.label}
							className={clsx(
								"group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200",
								isActive
									? "bg-surface-high text-primary-lime"
									: "text-on-surface-muted hover:bg-surface-high hover:text-on-surface"
							)}
						>
							{isActive && (
								<span className="absolute left-0 h-5 w-[3px] rounded-r-full bg-primary-lime" />
							)}
							{item.icon}
						</Link>
					);
				})}
			</div>

			<div className="flex flex-col items-center py-4">
				<Link
					href={configItem.href}
					title={configItem.label}
					className={clsx(
						"flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200",
						pathname === configItem.href
							? "bg-surface-high text-primary-lime"
							: "text-on-surface-muted hover:bg-surface-high hover:text-on-surface"
					)}
				>
					{configItem.icon}
				</Link>
			</div>
		</nav>
	);
};

export default SideMenu;
