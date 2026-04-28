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
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
				<polyline points="9 22 9 12 15 12 15 22" />
			</svg>
		),
	},
	{
		href: "/challenges",
		label: "Desafios",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<polyline points="8 21 12 17 16 21" />
				<line x1="12" y1="17" x2="12" y2="11" />
				<path d="M7 4H17l-1 7H8L7 4z" />
				<path d="M5 4a2 2 0 00-2 2v1c0 2.5 2 4 4 4" />
				<path d="M19 4a2 2 0 012 2v1c0 2.5-2 4-4 4" />
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
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
				<circle cx="12" cy="7" r="4" />
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
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="3" />
			<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
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

	const isActive = (href: string) =>
		href === "/challenges"
			? pathname.startsWith("/challenges")
			: pathname === href;

	return (
		<nav className="fixed z-[998] hidden h-screen w-[72px] flex-col bg-surface-low pt-[72px] md:flex">
			<div className="flex flex-1 flex-col items-center gap-1 py-4">
				{navItems.map((item) => {
					const active = isActive(item.href);
					return (
						<Link
							key={item.href}
							href={item.href}
							title={item.label}
							className={clsx(
								"group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200",
								active
									? "bg-surface-high text-primary-lime"
									: "text-on-surface-muted hover:bg-surface-high hover:text-on-surface",
							)}
						>
							{active && (
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
							: "text-on-surface-muted hover:bg-surface-high hover:text-on-surface",
					)}
				>
					{configItem.icon}
				</Link>
			</div>
		</nav>
	);
};

export default SideMenu;
