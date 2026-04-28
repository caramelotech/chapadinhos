"use client";

import Avatar from "@/components/Avatar";
import { CURRENT_USER } from "@/data/mock";
import { useRouter } from "next/navigation";

const RECENT_ACTIVITIES = [
	{ type: "Funcional", duration: 50, date: "26/04", icon: "⚡" },
	{ type: "Musculação", duration: 60, date: "24/04", icon: "🏋️" },
	{ type: "Corrida", duration: 35, date: "22/04", icon: "🏃" },
	{ type: "Caminhada", duration: 45, date: "21/04", icon: "🚶" },
];

export default function Page() {
	const router = useRouter();

	const handleLogout = async () => {
		router.push("/");
	};

	const stats = [
		{ label: "Atividades", value: CURRENT_USER.totalActivities, color: undefined },
		{ label: "Streak atual", value: `${CURRENT_USER.streak}sem`, color: "#FF6B35" },
		{ label: "Desafios", value: 2, color: undefined },
	];

	return (
		<div className="min-h-full bg-surface p-6 md:p-8">
			<div className="mx-auto max-w-2xl pb-2">
				<div className="mb-6 flex items-center justify-between">
					<h1 className="font-display text-h5 font-bold tracking-tight text-on-surface">
						Perfil
					</h1>
					<button
						type="button"
						aria-label="Configurações"
						className="grid h-9 w-9 place-items-center rounded-xl text-on-surface-muted transition-all hover:bg-surface-high hover:text-on-surface"
					>
						<SettingsIcon />
					</button>
				</div>

				<div className="mb-6 flex items-center gap-4">
					<Avatar name={CURRENT_USER.name} size={64} />
					<div>
						<p className="font-display text-lg font-bold tracking-tight text-on-surface">
							{CURRENT_USER.name}
						</p>
						<p className="mb-0.5 text-sm text-on-surface-muted">
							@{CURRENT_USER.username}
						</p>
						<p className="text-sm text-on-surface-muted">{CURRENT_USER.bio}</p>
					</div>
				</div>

				<div className="mb-8 flex gap-3">
					{stats.map((s) => (
						<div
							key={s.label}
							className="flex-1 rounded-2xl border border-surface-high bg-surface-container p-4 text-center"
						>
							<p
								className="font-display text-2xl font-bold"
								style={{ color: s.color ?? "var(--on-surface)" }}
							>
								{s.value}
							</p>
							<p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-on-surface-muted">
								{s.label}
							</p>
						</div>
					))}
				</div>

				<div className="mb-8">
					<p className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-muted">
						Histórico recente
					</p>
					<div className="flex flex-col gap-2">
						{RECENT_ACTIVITIES.map((a, i) => (
							<div
								key={i}
								className="flex items-center gap-4 rounded-2xl border border-surface-high bg-surface-container px-4 py-3.5"
							>
								<span className="text-2xl">{a.icon}</span>
								<div className="flex-1 min-w-0">
									<p className="font-display text-sm font-bold text-on-surface">
										{a.type}
									</p>
									<p className="flex items-center gap-1 text-xs text-on-surface-muted">
										<ClockIcon /> {a.duration} min
									</p>
								</div>
								<span className="text-sm text-on-surface-muted">{a.date}</span>
							</div>
						))}
					</div>
				</div>

				<button
					type="button"
					onClick={handleLogout}
					className="w-full rounded-xl border border-surface-high bg-surface-container py-3.5 text-sm font-semibold text-on-surface-muted transition-all hover:border-red-900/40 hover:bg-red-950/20 hover:text-red-400"
				>
					Sair da conta
				</button>
			</div>
		</div>
	);
}

function SettingsIcon() {
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
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="3" />
			<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
		</svg>
	);
}

function ClockIcon() {
	return (
		<svg
			width="11"
			height="11"
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
