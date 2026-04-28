"use client";

import validatePathName from "@/helpers/validatePathname";
import { useLogActivity } from "@/lib/query-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Header() {
	const [loggedIn, setLoggedIn] = useState(false);
	const pathname = usePathname();
	const { openLogActivity } = useLogActivity();

	useEffect(() => {
		setLoggedIn(validatePathName(pathname));
	}, [pathname]);

	if (loggedIn) {
		return (
			<header className="fixed z-[999] flex h-[72px] w-full items-center justify-between bg-surface-low px-4 md:pl-[72px] md:pr-5">
				<div className="md:ml-6">
					<Logo />
				</div>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => openLogActivity()}
						aria-label="Lançar atividade"
						className="hidden h-9 items-center gap-2 rounded-xl bg-primary-lime px-4 font-display text-xs font-bold text-on-primary transition-all hover:brightness-110 active:scale-[0.98] md:flex"
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 18 18"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M9 3v12M3 9h12"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
							/>
						</svg>
						Lançar
					</button>
					<Link
						href="/profile"
						aria-label="Perfil"
						className="grid h-9 w-9 place-items-center rounded-xl bg-surface-high font-display text-sm font-bold text-primary-lime ring-2 ring-surface-high transition-all hover:ring-primary-lime/40"
					>
						MF
					</Link>
				</div>
			</header>
		);
	}

	return (
		<header className="fixed z-[999] grid h-[72px] w-full place-items-center bg-surface-low">
			<Logo />
		</header>
	);
}
