"use client";

import Avatar from "@/components/Avatar";
import FeedItemCard from "@/components/FeedItemCard";
import { CHALLENGES, FEED, LEADERBOARD } from "@/data/mock";
import { useLogActivity } from "@/lib/query-client";
import Link from "next/link";
import { use, useState } from "react";

export default function Page({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = use(params);
	const [tab, setTab] = useState<"feed" | "ranking">("feed");
	const { openLogActivity } = useLogActivity();

	const challenge = CHALLENGES.find((c) => c.id === id);

	if (!challenge) {
		return (
			<div className="flex min-h-full items-center justify-center bg-surface p-8">
				<div className="text-center">
					<p className="mb-2 font-display text-lg font-bold text-on-surface">
						Desafio não encontrado
					</p>
					<Link
						href="/challenges"
						className="text-sm text-primary-lime hover:underline"
					>
						Voltar aos desafios
					</Link>
				</div>
			</div>
		);
	}

	const challengeFeed = FEED.filter((f) => f.challenge_id === id);

	const STATUS_STYLES = {
		draft: "text-on-surface-muted bg-surface-high",
		active: "text-primary-lime bg-primary-lime/10",
		finished: "text-on-surface-muted bg-surface-high",
	};
	const STATUS_LABELS = {
		draft: "Rascunho",
		active: "Ativo",
		finished: "Encerrado",
	};

	const endDate = new Date(challenge.end_date).toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "short",
	});

	return (
		<div className="min-h-full bg-surface px-4 py-6 md:px-8 md:py-8">
			<div className="mx-auto max-w-6xl">
				{/* Back + header */}
				<div className="mb-6">
					<Link
						href="/challenges"
						className="mb-4 flex items-center gap-1.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface"
					>
						<ChevronLeftIcon /> Desafios
					</Link>

					<div className="flex items-start justify-between gap-4">
						<div>
							<h1 className="mb-2 font-display text-h5 font-bold tracking-tight text-on-surface">
								{challenge.name}
							</h1>
							<div className="flex flex-wrap items-center gap-3">
								<span
									className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_STYLES[challenge.status]}`}
								>
									{STATUS_LABELS[challenge.status]}
								</span>
								<span className="flex items-center gap-1 text-sm text-on-surface-muted">
									<UsersIcon /> {challenge.participants} participantes
								</span>
								<span className="text-sm text-on-surface-muted">
									até {endDate}
								</span>
							</div>
						</div>

						{challenge.status === "active" && (
							<button
								type="button"
								onClick={() => openLogActivity(challenge.id)}
								className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-primary-lime px-4 py-2 font-display text-sm font-bold text-on-primary transition-all hover:brightness-110 active:scale-[0.98]"
							>
								<span aria-hidden="true">+</span> Lançar
							</button>
						)}
					</div>

					{challenge.description && (
						<p className="mt-3 max-w-2xl text-sm text-on-surface-muted">
							{challenge.description}
						</p>
					)}
				</div>

				{/* Stats row */}
				{challenge.status === "active" && (
					<div className="mb-6 grid grid-cols-2 gap-3 md:flex md:gap-4">
						<div className="rounded-xl border border-surface-high bg-surface-container p-4 md:flex-1">
							<p className="mb-1 text-[10px] font-semibold uppercase text-on-surface-muted">
								Seus pontos
							</p>
							<p className="font-display text-2xl font-bold text-primary-lime">
								{challenge.myPoints}
							</p>
						</div>
						<div className="rounded-xl border border-surface-high bg-surface-container p-4 md:flex-1">
							<p className="mb-1 text-[10px] font-semibold uppercase text-on-surface-muted">
								Streak
							</p>
							<p className="font-display text-2xl font-bold text-on-surface">
								{challenge.myStreak} 🔥
							</p>
						</div>
						{challenge.mode === "casual" && challenge.weekly_goal_count && (
							<div className="col-span-2 rounded-xl border border-surface-high bg-surface-container p-4 md:flex-1">
								<p className="mb-1 text-[10px] font-semibold uppercase text-on-surface-muted">
									Meta/semana
								</p>
								<p className="font-display text-2xl font-bold text-on-surface">
									{challenge.weekly_goal_count}
									<span className="ml-1 text-sm font-normal text-on-surface-muted">
										ativ.
									</span>
								</p>
							</div>
						)}
					</div>
				)}

				{/* Tab switcher */}
				<div className="mb-6 flex gap-1 rounded-xl bg-surface-container p-1 md:max-w-xs">
					{(["feed", "ranking"] as const).map((t) => (
						<button
							key={t}
							type="button"
							onClick={() => setTab(t)}
							className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all ${
								tab === t
									? "bg-primary-lime text-on-primary"
									: "text-on-surface-muted hover:text-on-surface"
							}`}
						>
							{t === "feed" ? "Feed" : "Ranking"}
						</button>
					))}
				</div>

				{/* Content */}
				{tab === "feed" ? (
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						{challengeFeed.length > 0 ? (
							challengeFeed.map((item) => (
								<FeedItemCard key={item.id} item={item} />
							))
						) : (
							<div className="col-span-full rounded-2xl border border-dashed border-surface-high bg-surface-container p-8 text-center">
								<p className="text-sm text-on-surface-muted">
									Nenhuma atividade registrada ainda.
								</p>
							</div>
						)}
					</div>
				) : (
					<div className="flex max-w-2xl flex-col gap-2">
						{LEADERBOARD.map((entry) => (
							<div
								key={entry.rank}
								className={`flex items-center gap-3 rounded-2xl border p-4 ${
									entry.isMe
										? "border-primary-lime/30 bg-primary-lime/5"
										: "border-surface-high bg-surface-container"
								}`}
							>
								<div className="w-8 flex-shrink-0 text-center">
									{entry.rank <= 3 ? (
										<span className="text-xl">
											{["🥇", "🥈", "🥉"][entry.rank - 1]}
										</span>
									) : (
										<span className="font-display text-sm font-bold text-on-surface-muted">
											{entry.rank}
										</span>
									)}
								</div>

								<Avatar name={entry.user.name} size={40} />

								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-2">
										<span className="font-display text-sm font-bold text-on-surface">
											{entry.user.name}
										</span>
										{entry.isMe && (
											<span className="rounded-full bg-primary-lime/10 px-2 py-0.5 text-xs font-semibold text-primary-lime">
												você
											</span>
										)}
									</div>
									<span className="text-xs text-on-surface-muted">
										🔥 {entry.streak} streak
									</span>
								</div>

								<div className="text-right">
									<p
										className={`font-display text-xl font-bold ${
											entry.isMe ? "text-primary-lime" : "text-on-surface"
										}`}
									>
										{entry.points}
									</p>
									<p className="text-[10px] font-semibold uppercase text-on-surface-muted">
										semanas
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function ChevronLeftIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<polyline points="15 18 9 12 15 6" />
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
