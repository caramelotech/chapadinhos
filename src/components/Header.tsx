"use client";

import validatePathName from "@/helpers/validatePathname";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Header() {
	const [loggedIn, setLoggedIn] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setLoggedIn(validatePathName(pathname));
	}, [pathname]);

	if (loggedIn) {
		return (
			<header className="fixed z-[999] flex h-[72px] w-full items-center justify-between bg-surface-low pl-[72px]">
				<div className="ml-6">
					<Logo />
				</div>
				<div className="mr-5 flex items-center gap-3">
					<button
						type="button"
						aria-label="Criar novo desafio"
						className="grid h-9 w-9 place-items-center rounded-xl text-on-surface-muted transition-all duration-200 hover:bg-surface-high hover:text-primary-lime"
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M9 3v12M3 9h12"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</button>
					<div className="h-9 w-9 overflow-hidden rounded-xl ring-2 ring-surface-high transition-all hover:ring-primary-lime/40">
						<Image
							src="/placeholder.png"
							width={36}
							height={36}
							alt="Imagem de perfil"
							className="h-full w-full object-cover"
						/>
					</div>
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
