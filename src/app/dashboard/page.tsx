"use client";

import FeedItemCard from "@/components/FeedItemCard";
import { CHALLENGES, CURRENT_USER, FEED, WEEK_CALENDAR } from "@/data/mock";
import { useLogActivity } from "@/lib/query-client";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
	const { openLogActivity } = useLogActivity();
	const activeChallenge = CHALLENGES.find((c) => c.status === "active");
	const [feed] = useState(FEED);

	return (
		<div className="min-h-full bg-surface px-4 py-6 md:px-8 md:py-8">
			<div className="mx-auto max-w-6xl">
				{/* Greeting */}
				<div className="mb-6 flex items-center justify-between">
					<div>
						<p className="text-sm text-on-surface-muted">Olá,</p>
						<h1 className="font-display text-h5 font-bold tracking-tight text-on-surface">
							{CURRENT_USER.name.split(" ")[0]} 👋
						</h1>
					</div>
					<button
						type="button"
						onClick={() => openLogActivity()}
						className="flex items-center gap-2 rounded-xl bg-primary-lime px-4 py-2 font-display text-sm font-bold text-on-primary transition-all hover:brightness-110 active:scale-[0.98] md:hidden"
					>
						+ Lançar
					</button>
				</div>

				{/* Two-column layout on large screens */}
				<div className="lg:grid lg:grid-cols-[380px_1fr] lg:items-start lg:gap-8 xl:grid-cols-[420px_1fr]">
					{/* Left column: active challenge card */}
					<div className="mb-8 lg:sticky lg:top-[88px] lg:mb-0">
						{activeChallenge ? (
							<Link
								href={`/challenges/${activeChallenge.id}`}
								className="block rounded-2xl border border-primary-lime/20 bg-gradient-to-br from-primary-lime/10 to-primary-lime/5 p-5 transition-all hover:border-primary-lime/30 hover:from-primary-lime/15"
							>
								<div className="mb-4 flex items-start justify-between">
									<div>
										<p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-lime">
											Desafio ativo
										</p>
										<h2 className="font-display text-lg font-bold tracking-tight text-on-surface">
											{activeChallenge.name}
										</h2>
									</div>
									<ChevronRightIcon />
								</div>

								<div className="mb-4 flex gap-3">
									<div className="flex-1 rounded-xl bg-surface/50 p-3">
										<p className="mb-1 text-[10px] font-semibold uppercase text-on-surface-muted">
											Streak
										</p>
										<div className="flex items-center gap-2">
											<span>🔥</span>
											<span className="font-display text-xl font-bold text-on-surface">
												{activeChallenge.myStreak}
											</span>
											<span className="text-xs text-on-surface-muted">
												semanas
											</span>
										</div>
									</div>
									<div className="flex-1 rounded-xl bg-surface/50 p-3">
										<p className="mb-1 text-[10px] font-semibold uppercase text-on-surface-muted">
											Semana
										</p>
										<div className="flex items-center gap-2">
											<span>🎯</span>
											<span className="font-display text-xl font-bold text-on-surface">
												4
											</span>
											<span className="text-xs text-on-surface-muted">
												/{activeChallenge.weekly_goal_count} ativ.
											</span>
										</div>
									</div>
								</div>

								<div className="flex gap-1.5">
									{WEEK_CALENDAR.map((d, i) => (
										<div
											key={i}
											className="flex flex-1 flex-col items-center gap-1"
										>
											<span
												className={`text-[9px] font-bold ${d.today ? "text-primary-lime" : "text-on-surface-muted"}`}
											>
												{d.day}
											</span>
											<div
												className={`grid h-7 w-7 place-items-center rounded-lg ${
													d.done
														? "bg-primary-lime"
														: d.today
															? "border border-primary-lime bg-surface-container"
															: "border border-surface-high bg-surface-container"
												}`}
											>
												{d.done && <CheckIcon />}
											</div>
										</div>
									))}
								</div>
							</Link>
						) : (
							<div className="rounded-2xl border border-dashed border-surface-high bg-surface-container p-8 text-center">
								<p className="mb-1 font-display text-base font-bold text-on-surface">
									Nenhum desafio ativo
								</p>
								<p className="mb-4 text-sm text-on-surface-muted">
									Entre em um desafio para ver seu progresso aqui
								</p>
								<Link
									href="/challenges"
									className="inline-flex items-center gap-2 rounded-xl bg-primary-lime px-5 py-2.5 font-display text-sm font-bold text-on-primary transition-all hover:brightness-110"
								>
									Ver desafios
								</Link>
							</div>
						)}
					</div>

					{/* Right column: feed */}
					<div>
						<p className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-muted">
							Feed
						</p>
						<div className="flex flex-col gap-3">
							{feed.map((item) => (
								<FeedItemCard key={item.id} item={item} />
							))}
						</div>
					</div>
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
			className="flex-shrink-0 text-primary-lime"
			aria-hidden="true"
		>
			<polyline points="9 18 15 12 9 6" />
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#121416"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
}
