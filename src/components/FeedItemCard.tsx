"use client";

import { useState } from "react";
import type { FeedItem } from "@/types";
import Avatar from "./Avatar";

const ACTIVITY_ICONS: Record<string, string> = {
	Musculação: "🏋️",
	Corrida: "🏃",
	Caminhada: "🚶",
	Ciclismo: "🚴",
	Natação: "🏊",
	Pilates: "🧘",
	Yoga: "🧘",
	Funcional: "⚡",
	"Artes Marciais": "🥋",
	"Esportes Coletivos": "⚽",
	Outro: "💪",
};

interface Props {
	item: FeedItem;
}

export default function FeedItemCard({ item }: Props) {
	const [reactions, setReactions] = useState(item.reactions);
	const [comments, setComments] = useState(item.comments);
	const [showComments, setShowComments] = useState(false);
	const [comment, setComment] = useState("");
	const isMe = item.user.username === "mferreira";
	const icon = ACTIVITY_ICONS[item.activity_type] ?? "💪";

	const toggleReaction = (i: number) => {
		setReactions((prev) =>
			prev.map((r, idx) =>
				idx === i
					? {
							...r,
							reacted: !r.reacted,
							count: r.reacted ? r.count - 1 : r.count + 1,
						}
					: r,
			),
		);
	};

	const addComment = () => {
		if (!comment.trim()) return;
		setComments((prev) => [
			...prev,
			{ user: "mferreira", text: comment, time: "agora" },
		]);
		setComment("");
	};

	return (
		<div className="overflow-hidden rounded-2xl border border-surface-high bg-surface-container">
			<div className="p-4 pb-3">
				<div className="mb-3 flex items-center gap-3">
					<Avatar name={item.user.name} size={36} />
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2">
							<span className="font-display text-sm font-bold text-on-surface">
								{item.user.name}
							</span>
							{isMe && (
								<span className="rounded-full bg-primary-lime/10 px-2 py-0.5 text-xs font-semibold text-primary-lime">
									você
								</span>
							)}
						</div>
						<span className="text-xs text-on-surface-muted">
							@{item.user.username} · {item.time}
						</span>
					</div>
					<span className="text-2xl">{icon}</span>
				</div>

				<div className="mb-1 flex items-center gap-2">
					<span className="font-display text-base font-bold text-on-surface">
						{item.activity_type}
					</span>
					<span className="flex items-center gap-1 text-xs text-on-surface-muted">
						<ClockIcon />
						{item.duration_minutes} min
					</span>
				</div>

				{item.notes && (
					<p className="text-sm leading-relaxed text-on-surface-muted">
						{item.notes}
					</p>
				)}
			</div>

			<div className="flex items-center gap-2 border-t border-surface-high px-4 py-2">
				{reactions.map((r, i) => (
					<button
						key={`${r.emoji}-${i}`}
						type="button"
						onClick={() => toggleReaction(i)}
						className="flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold transition-all"
						style={{
							background: r.reacted ? "rgba(202,243,0,0.08)" : "transparent",
							border: r.reacted
								? "1px solid rgba(202,243,0,0.25)"
								: "1px solid rgb(40,42,44)",
							color: r.reacted ? "#caf300" : "#9aa0a6",
						}}
					>
						<span>{r.emoji}</span>
						<span>{r.count}</span>
					</button>
				))}
				<button
					type="button"
					onClick={() => setShowComments((v) => !v)}
					className="ml-auto flex items-center gap-1.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface"
				>
					<MsgIcon />
					{comments.length > 0 && <span>{comments.length}</span>}
				</button>
			</div>

			{showComments && (
				<div className="border-t border-surface-high bg-surface px-4 py-3">
					{comments.map((c, i) => (
						<div
							key={`${c.user}-${i}`}
							className="mb-2 flex gap-2"
						>
							<Avatar name={c.user} size={24} />
							<div className="flex-1 min-w-0">
								<span className="text-sm font-semibold text-on-surface">
									@{c.user}
								</span>
								<span className="ml-2 text-sm text-on-surface-muted">
									{c.text}
								</span>
							</div>
						</div>
					))}
					<div className="mt-2 flex gap-2">
						<Avatar name="Mateus Ferreira" size={24} />
						<input
							className="flex-1 rounded-lg border border-surface-high bg-surface-container px-3 py-1.5 text-sm text-on-surface outline-none placeholder:text-on-surface-muted focus:border-primary-lime/40"
							placeholder="Comentar..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && addComment()}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

function ClockIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 6 12 12 16 14" />
		</svg>
	);
}

function MsgIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
		</svg>
	);
}
