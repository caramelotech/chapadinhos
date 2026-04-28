"use client";

import validatePathName from "@/helpers/validatePathname";
import { useLogActivity } from "@/lib/query-client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
	{
		href: "/dashboard",
		label: "Início",
		icon: (
			<svg
				width="22"
				height="22"
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
				width="22"
				height="22"
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
				width="22"
				height="22"
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

export default function BottomNav() {
	const [visible, setVisible] = useState(false);
	const pathname = usePathname();
	const { openLogActivity } = useLogActivity();

	useEffect(() => {
		setVisible(validatePathName(pathname));
	}, [pathname]);

	if (!visible) return null;

	const isActive = (href: string) =>
		href === "/challenges"
			? pathname.startsWith("/challenges")
			: pathname === href;

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-[998] border-t border-surface-high bg-surface-low pb-safe md:hidden">
			<div className="flex items-center">
				{navItems.slice(0, 2).map((item) => {
					const active = isActive(item.href);
					return (
						<Link
							key={item.href}
							href={item.href}
							className={clsx(
								"flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-bold transition-colors",
								active ? "text-primary-lime" : "text-on-surface-muted",
							)}
						>
							{item.icon}
							{item.label}
						</Link>
					);
				})}

				<div className="flex flex-1 justify-center">
					<button
						type="button"
						onClick={() => openLogActivity()}
						aria-label="Lançar atividade"
						className="-translate-y-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary-lime shadow-lg transition-all active:scale-95"
						style={{ boxShadow: "0 4px 20px rgba(202,243,0,0.35)" }}
					>
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#121416"
							strokeWidth="2.5"
							strokeLinecap="round"
							aria-hidden="true"
						>
							<line x1="12" y1="5" x2="12" y2="19" />
							<line x1="5" y1="12" x2="19" y2="12" />
						</svg>
					</button>
				</div>

				{navItems.slice(2).map((item) => {
					const active = isActive(item.href);
					return (
						<Link
							key={item.href}
							href={item.href}
							className={clsx(
								"flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-bold transition-colors",
								active ? "text-primary-lime" : "text-on-surface-muted",
							)}
						>
							{item.icon}
							{item.label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
