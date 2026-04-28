"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ChallengeMode = "casual" | "competitive";
type ChallengeVisibility = "private" | "public";
type Duration = "1month" | "3months" | "6months" | "1year";

interface Form {
	name: string;
	visibility: ChallengeVisibility;
	mode: ChallengeMode;
	duration: Duration;
	weekly_goal: number;
	min_duration: number;
}

const DURATION_LABELS: Record<Duration, string> = {
	"1month": "1 mês",
	"3months": "3 meses",
	"6months": "6 meses",
	"1year": "1 ano",
};

const STEP_TITLES = ["Configurações gerais", "Regras e duração", "Revisar e criar"];

export default function Page() {
	const router = useRouter();
	const [step, setStep] = useState(0);
	const [form, setForm] = useState<Form>({
		name: "",
		visibility: "private",
		mode: "casual",
		duration: "1month",
		weekly_goal: 3,
		min_duration: 30,
	});

	const set = <K extends keyof Form>(key: K, value: Form[K]) =>
		setForm((prev) => ({ ...prev, [key]: value }));

	const handleCreate = () => {
		router.push("/challenges");
	};

	return (
		<div className="min-h-full bg-surface p-6 md:p-8">
			<div className="mx-auto max-w-lg">
				<div className="mb-6">
					<Link
						href="/challenges"
						className="mb-4 flex items-center gap-1.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface"
					>
						<ChevronLeftIcon /> Cancelar
					</Link>
					<h1 className="mb-1 font-display text-h5 font-bold tracking-tight text-on-surface">
						Novo desafio
					</h1>
					<p className="mb-5 text-sm text-on-surface-muted">
						{STEP_TITLES[step]}
					</p>
					<div className="flex gap-1.5">
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
									i <= step ? "bg-primary-lime" : "bg-surface-high"
								}`}
							/>
						))}
					</div>
				</div>

				<div className="min-h-[320px]">
					{step === 0 && (
						<div className="flex flex-col gap-6">
							<div>
								<label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
									Nome do desafio
								</label>
								<input
									className="w-full rounded-xl border border-surface-high bg-surface-container px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-muted focus:border-primary-lime/40"
									placeholder="Ex: Abril Chapado"
									value={form.name}
									onChange={(e) => set("name", e.target.value)}
								/>
							</div>

							<div>
								<label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
									Visibilidade
								</label>
								<div className="flex gap-3">
									<OptionBtn
										active={form.visibility === "private"}
										onClick={() => set("visibility", "private")}
									>
										🔒 Privado
									</OptionBtn>
									<OptionBtn
										active={form.visibility === "public"}
										onClick={() => set("visibility", "public")}
									>
										🌍 Público
									</OptionBtn>
								</div>
							</div>

							<div>
								<label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
									Modo
								</label>
								<div className="flex gap-3">
									<OptionBtn
										active={form.mode === "casual"}
										onClick={() => set("mode", "casual")}
									>
										😌 Casual
									</OptionBtn>
									<OptionBtn
										active={form.mode === "competitive"}
										onClick={() => set("mode", "competitive")}
									>
										🔥 Insano
									</OptionBtn>
								</div>
								<div className="mt-3 rounded-xl border border-surface-high bg-surface-container px-4 py-3 text-sm leading-relaxed text-on-surface-muted">
									{form.mode === "casual"
										? "😌 Foco em consistência. Meta semanal recorrente com streak semanal."
										: "🔥 Foco em volume. Sem meta semanal - acumule o máximo de pontos."}
								</div>
							</div>
						</div>
					)}

					{step === 1 && (
						<div className="flex flex-col gap-6">
							<div>
								<label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
									Duração
								</label>
								<div className="flex flex-wrap gap-2">
									{(
										["1month", "3months", "6months", "1year"] as Duration[]
									).map((d) => (
										<button
											key={d}
											type="button"
											onClick={() => set("duration", d)}
											className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
												form.duration === d
													? "bg-primary-lime text-on-primary"
													: "border border-surface-high bg-surface-container text-on-surface-muted hover:text-on-surface"
											}`}
										>
											{DURATION_LABELS[d]}
										</button>
									))}
								</div>
							</div>

							{form.mode === "casual" && (
								<div>
									<label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
										Meta semanal (atividades)
									</label>
									<div className="flex gap-2">
										{[2, 3, 4, 5].map((n) => (
											<button
												key={n}
												type="button"
												onClick={() => set("weekly_goal", n)}
												className={`flex-1 rounded-xl py-3 font-display text-lg font-bold transition-all ${
													form.weekly_goal === n
														? "bg-primary-lime text-on-primary"
														: "border border-surface-high bg-surface-container text-on-surface-muted hover:text-on-surface"
												}`}
											>
												{n}
											</button>
										))}
									</div>
								</div>
							)}

							<div>
								<label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
									Duração mínima por atividade
								</label>
								<div className="flex gap-2">
									{[20, 30, 45, 60].map((n) => (
										<button
											key={n}
											type="button"
											onClick={() => set("min_duration", n)}
											className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
												form.min_duration === n
													? "bg-primary-lime text-on-primary"
													: "border border-surface-high bg-surface-container text-on-surface-muted hover:text-on-surface"
											}`}
										>
											{n}min
										</button>
									))}
								</div>
							</div>
						</div>
					)}

					{step === 2 && (
						<div className="flex flex-col gap-4">
							<div className="rounded-2xl border border-surface-high bg-surface-container p-5">
								<p className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-muted">
									Resumo do desafio
								</p>
								{[
									["Nome", form.name || "—"],
									[
										"Visibilidade",
										form.visibility === "private"
											? "🔒 Privado"
											: "🌍 Público",
									],
									[
										"Modo",
										form.mode === "casual"
											? "😌 Casual"
											: "🔥 Competitivo",
									],
									["Duração", DURATION_LABELS[form.duration]],
									...(form.mode === "casual"
										? [
												[
													"Meta semanal",
													`${form.weekly_goal} atividades/semana`,
												],
											]
										: []),
									["Mín. por atividade", `${form.min_duration} minutos`],
								].map(([k, v]) => (
									<div
										key={k}
										className="flex justify-between border-b border-surface-high py-3 last:border-0"
									>
										<span className="text-sm text-on-surface-muted">{k}</span>
										<span className="text-sm font-semibold text-on-surface">
											{v}
										</span>
									</div>
								))}
							</div>

							<div className="rounded-2xl border border-dashed border-surface-high bg-surface-container p-5 text-center">
								<p className="font-display text-sm font-bold text-on-surface">
									Convidar participantes
								</p>
								<p className="mt-1 text-xs text-on-surface-muted">
									Você poderá adicionar amigos por @username ou link após criar
									o desafio
								</p>
							</div>
						</div>
					)}
				</div>

				<div className="mt-8 flex gap-3">
					{step > 0 && (
						<button
							type="button"
							onClick={() => setStep((s) => s - 1)}
							className="flex-1 rounded-xl border border-surface-high bg-surface-container py-3 text-sm font-bold text-on-surface transition-all hover:bg-surface-high"
						>
							Anterior
						</button>
					)}
					<button
						type="button"
						onClick={() => (step < 2 ? setStep((s) => s + 1) : handleCreate())}
						className="flex-[2] rounded-xl bg-primary-lime py-3 text-sm font-bold text-on-primary transition-all hover:brightness-110 active:scale-[0.98]"
					>
						{step < 2 ? "Continuar" : "🚀 Criar desafio"}
					</button>
				</div>
			</div>
		</div>
	);
}

function OptionBtn({
	active,
	onClick,
	children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
				active
					? "bg-primary-lime text-on-primary"
					: "border border-surface-high bg-surface-container text-on-surface-muted hover:text-on-surface"
			}`}
		>
			{children}
		</button>
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
