"use client";

import { CHALLENGES } from "@/data/mock";
import Link from "next/link";

const STATUS_LABELS = {
	draft: "Rascunho",
	active: "Ativo",
	finished: "Encerrado",
};

const STATUS_STYLES = {
	draft: "text-on-surface-muted bg-surface-high",
	active: "text-primary-lime bg-primary-lime/10",
	finished: "text-on-surface-muted bg-surface-high",
};

export default function Page() {
	return (
		<div className="min-h-full bg-surface px-4 py-6 md:px-8 md:py-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="font-display text-h5 font-bold tracking-tight text-on-surface">
						Desafios
					</h1>
					<Link
						href="/challenges/new"
						className="flex items-center gap-2 rounded-xl bg-primary-lime px-4 py-2 font-display text-sm font-bold text-on-primary transition-all hover:brightness-110 active:scale-[0.98]"
					>
						<span aria-hidden="true">+</span> Novo
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
					{CHALLENGES.map((c) => (
						<Link
							key={c.id}
							href={`/challenges/${c.id}`}
							className="flex flex-col rounded-2xl border border-surface-high bg-surface-container p-5 transition-all hover:bg-surface-high"
						>
							<div className="mb-3 flex items-start justify-between">
								<div className="min-w-0 flex-1 pr-3">
									<h2 className="mb-2 font-display text-base font-bold tracking-tight text-on-surface">
										{c.name}
									</h2>
									<div className="flex flex-wrap items-center gap-2">
										<span
											className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_STYLES[c.status]}`}
										>
											{STATUS_LABELS[c.status]}
										</span>
										<span className="flex items-center gap-1 text-xs text-on-surface-muted">
											{c.visibility === "private" ? (
												<LockIcon />
											) : (
												<GlobeIcon />
											)}
											{c.visibility === "private" ? "Privado" : "Público"}
										</span>
									</div>
								</div>
								<ChevronRightIcon />
							</div>

							<div className="mb-4 flex gap-4">
								<span className="flex items-center gap-1.5 text-sm text-on-surface-muted">
									<UsersIcon /> {c.participants} participantes
								</span>
								<span className="text-sm text-on-surface-muted">
									{c.mode === "casual" ? "Casual" : "Competitivo"}
								</span>
							</div>

							<div className="mt-auto">
								{c.status === "active" && (
									<div className="flex gap-3">
										<div className="flex-1 rounded-xl bg-surface p-3">
											<p className="mb-0.5 text-[10px] font-semibold uppercase text-on-surface-muted">
												Seus pontos
											</p>
											<p className="font-display text-xl font-bold text-primary-lime">
												{c.myPoints}
											</p>
										</div>
										<div className="flex-1 rounded-xl bg-surface p-3">
											<p className="mb-0.5 text-[10px] font-semibold uppercase text-on-surface-muted">
												Streak
											</p>
											<p className="font-display text-xl font-bold text-on-surface">
												{c.myStreak} 🔥
											</p>
										</div>
									</div>
								)}

								{c.status === "draft" && (
									<p className="text-sm text-on-surface-muted">{c.description}</p>
								)}
							</div>
						</Link>
					))}

					<Link
						href="/challenges/new"
						className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-surface-high bg-surface-container p-8 transition-all hover:border-primary-lime/30 md:min-h-[160px]"
					>
						<div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-lime/10">
							<span
								className="text-xl leading-none text-primary-lime"
								aria-hidden="true"
							>
								+
							</span>
						</div>
						<div className="text-center">
							<p className="font-display font-bold text-on-surface">
								Criar novo desafio
							</p>
							<p className="text-sm text-on-surface-muted">
								Convide seus amigos e comece agora
							</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

function ChevronRightIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="flex-shrink-0 text-on-surface-muted"
			aria-hidden="true"
		>
			<polyline points="9 18 15 12 9 6" />
		</svg>
	);
}

function LockIcon() {
	return (
		<svg
			width="10"
			height="10"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			aria-hidden="true"
		>
			<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
			<path d="M7 11V7a5 5 0 0110 0v4" />
		</svg>
	);
}

function GlobeIcon() {
	return (
		<svg
			width="10"
			height="10"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" />
			<line x1="2" y1="12" x2="22" y2="12" />
			<path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
		</svg>
	);
}

function UsersIcon() {
	return (
		<svg
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			aria-hidden="true"
		>
			<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 00-3-3.87" />
			<path d="M16 3.13a4 4 0 010 7.75" />
		</svg>
	);
}
