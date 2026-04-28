"use client";

import { useRef, useState } from "react";
import { ACTIVITY_ICONS, ACTIVITY_TYPES, CHALLENGES } from "@/data/mock";

const PRESETS = [20, 30, 45, 60, 90];

interface Props {
	challengeId?: string;
	onClose: () => void;
}

export default function LogActivityModal({ challengeId, onClose }: Props) {
	const [step, setStep] = useState(0);
	const [activityType, setActivityType] = useState("");
	const [duration, setDuration] = useState(30);
	const [customMode, setCustomMode] = useState(false);
	const [customValue, setCustomValue] = useState("");
	const customInputRef = useRef<HTMLInputElement>(null);
	const [notes, setNotes] = useState("");
	const [applyChallenges, setApplyChallenges] = useState<string[]>(
		challengeId ? [challengeId] : [],
	);

	const activeChallenges = CHALLENGES.filter((c) => c.status === "active");

	const effectiveDuration = customMode ? parseInt(customValue) || 0 : duration;
	const canContinue = step !== 1 || effectiveDuration >= 1;

	const selectPreset = (n: number) => {
		setDuration(n);
		setCustomMode(false);
		setCustomValue("");
	};

	const activateCustom = () => {
		setCustomMode(true);
		setCustomValue(String(duration));
		setTimeout(() => customInputRef.current?.focus(), 0);
	};

	const handleCustomChange = (v: string) => {
		if (v === "" || (/^\d+$/.test(v) && parseInt(v) <= 999)) {
			setCustomValue(v);
		}
	};

	const toggleChallenge = (id: string) => {
		setApplyChallenges((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);
	};

	const STEP_TITLES = [
		"Que atividade foi?",
		"Detalhes",
		"Aplicar a desafios",
	];

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal — bottom sheet on mobile, dialog on desktop */}
			<div className="fixed inset-x-0 bottom-0 z-[1001] flex max-h-[88vh] flex-col rounded-t-3xl border-x border-t border-surface-high bg-surface-low md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border">
				{/* Drag handle — mobile only */}
				<div className="flex flex-shrink-0 justify-center pb-2 pt-3 md:hidden">
					<div className="h-1 w-9 rounded-full bg-surface-high" />
				</div>

				{/* Header */}
				<div className="flex flex-shrink-0 items-center justify-between border-b border-surface-high px-5 py-4">
					<div className="flex items-center gap-3">
						{step > 0 && (
							<button
								type="button"
								onClick={() => setStep((s) => s - 1)}
								className="grid h-8 w-8 place-items-center rounded-full bg-surface-high text-on-surface-muted transition-colors hover:text-on-surface"
								aria-label="Voltar"
							>
								<ChevronLeftIcon />
							</button>
						)}
						<h2 className="font-display text-lg font-bold text-on-surface">
							{STEP_TITLES[step]}
						</h2>
					</div>

					<div className="flex items-center gap-3">
						{/* Step dots */}
						<div className="flex items-center gap-1">
							{[0, 1, 2].map((i) => (
								<div
									key={i}
									className={`h-1.5 rounded-full transition-all duration-300 ${
										i === step
											? "w-4 bg-primary-lime"
											: i < step
												? "w-1.5 bg-primary-lime/40"
												: "w-1.5 bg-surface-high"
									}`}
								/>
							))}
						</div>
						<button
							type="button"
							onClick={onClose}
							className="grid h-8 w-8 place-items-center rounded-full bg-surface-high text-on-surface-muted transition-colors hover:text-on-surface"
							aria-label="Fechar"
						>
							<XIcon />
						</button>
					</div>
				</div>

				{/* Scrollable content */}
				<div className="flex-1 overflow-y-auto px-5 py-5">
					{/* Step 0 — activity type grid */}
					{step === 0 && (
						<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
							{ACTIVITY_TYPES.map((t) => (
								<button
									key={t}
									type="button"
									onClick={() => {
										setActivityType(t);
										setStep(1);
									}}
									className="flex flex-col items-center justify-center gap-2 rounded-xl border border-surface-high bg-surface-container px-3 py-4 text-sm font-semibold text-on-surface-muted transition-all hover:border-primary-lime/30 hover:bg-surface-high hover:text-on-surface"
								>
									<span className="text-2xl leading-none">
										{ACTIVITY_ICONS[t]}
									</span>
									<span className="text-center leading-tight">{t}</span>
								</button>
							))}
						</div>
					)}

					{/* Step 1 — details */}
					{step === 1 && (
						<div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-6">
							{/* Left column: type summary + duration */}
							<div className="flex flex-col gap-5">
								{/* Selected activity type */}
								<div className="flex items-center gap-3 rounded-xl border border-surface-high bg-surface-container px-4 py-3">
									<span className="text-3xl leading-none">
										{ACTIVITY_ICONS[activityType]}
									</span>
									<div>
										<p className="font-display font-bold text-on-surface">
											{activityType}
										</p>
										<button
											type="button"
											onClick={() => setStep(0)}
											className="text-xs font-semibold text-primary-lime hover:underline"
										>
											Mudar
										</button>
									</div>
								</div>

								{/* Duration */}
								<div>
									<p className="mb-3 text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
										Duração (minutos)
									</p>

									{/* Preset buttons + Outro */}
									<div className="flex flex-wrap gap-2">
										{PRESETS.map((n) => (
											<button
												key={n}
												type="button"
												onClick={() => selectPreset(n)}
												className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
													!customMode && duration === n
														? "bg-primary-lime text-on-primary"
														: "border border-surface-high bg-surface-container text-on-surface-muted hover:text-on-surface"
												}`}
											>
												{n}
											</button>
										))}
										<button
											type="button"
											onClick={activateCustom}
											className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
												customMode
													? "bg-primary-lime text-on-primary"
													: "border border-surface-high bg-surface-container text-on-surface-muted hover:text-on-surface"
											}`}
										>
											<PencilIcon active={customMode} />
											Outro
										</button>
									</div>

									{/* Custom duration input */}
									{customMode && (
										<div className="mt-3 flex items-center gap-3 rounded-xl border border-primary-lime/40 bg-surface-container px-4 py-3 focus-within:border-primary-lime/70">
											<input
												ref={customInputRef}
												type="number"
												inputMode="numeric"
												min={1}
												max={999}
												value={customValue}
												onChange={(e) => handleCustomChange(e.target.value)}
												placeholder="Ex: 75"
												className="w-full bg-transparent font-display text-2xl font-bold text-on-surface outline-none placeholder:text-on-surface-muted/40"
											/>
											<span className="flex-shrink-0 text-sm font-semibold text-on-surface-muted">
												min
											</span>
										</div>
									)}
								</div>
							</div>

							{/* Right column: notes */}
							<div className="flex flex-col gap-2">
								<p className="text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
									Notas (opcional)
								</p>
								<textarea
									className="w-full flex-1 resize-none rounded-xl border border-surface-high bg-surface-container px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-muted focus:border-primary-lime/40 md:min-h-[160px]"
									placeholder="Como foi o treino?"
									rows={4}
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
								/>
							</div>
						</div>
					)}

					{/* Step 2 — apply to challenges */}
					{step === 2 && (
						<div className="flex flex-col gap-3">
							{activeChallenges.length > 0 ? (
								<>
									<p className="mb-1 text-sm text-on-surface-muted">
										Aplicar este registro a algum desafio ativo?
									</p>
									<div className="grid gap-2 md:grid-cols-2">
										{activeChallenges.map((c) => {
											const selected = applyChallenges.includes(c.id);
											return (
												<button
													key={c.id}
													type="button"
													onClick={() => toggleChallenge(c.id)}
													className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
														selected
															? "border-primary-lime/40 bg-primary-lime/5"
															: "border-surface-high bg-surface-container hover:bg-surface-high"
													}`}
												>
													<div
														className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-md transition-colors ${
															selected
																? "bg-primary-lime"
																: "border border-surface-high bg-surface"
														}`}
													>
														{selected && <CheckIcon />}
													</div>
													<div className="min-w-0 flex-1">
														<p className="font-display text-sm font-bold text-on-surface">
															{c.name}
														</p>
														<p className="text-xs text-on-surface-muted">
															{c.mode === "casual" ? "Casual" : "Competitivo"}{" "}
															· {c.participants} participantes
														</p>
													</div>
												</button>
											);
										})}
									</div>
								</>
							) : (
								<div className="rounded-xl border border-surface-high bg-surface-container px-4 py-6 text-center">
									<p className="text-sm text-on-surface-muted">
										Nenhum desafio ativo no momento.
									</p>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Sticky footer — steps 1 and 2 */}
				{step > 0 && (
					<div className="flex-shrink-0 border-t border-surface-high px-5 pb-8 pt-4 md:pb-5">
						<div className="flex items-center justify-between gap-4">
							<div className="min-w-0 truncate text-sm text-on-surface-muted">
								{effectiveDuration > 0 && (
									<>
										<span className="font-bold text-on-surface">
											{effectiveDuration}
										</span>{" "}
										min · {activityType}
									</>
								)}
							</div>
							<button
								type="button"
								onClick={() =>
									step < 2 ? setStep((s) => s + 1) : onClose()
								}
								disabled={!canContinue}
								className="flex-shrink-0 rounded-xl bg-primary-lime px-8 py-3 text-sm font-bold text-on-primary transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
							>
								{step < 2 ? "Continuar" : "Registrar atividade"}
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

function XIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			aria-hidden="true"
		>
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
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

function PencilIcon({ active }: { active: boolean }) {
	return (
		<svg
			width="13"
			height="13"
			viewBox="0 0 24 24"
			fill="none"
			stroke={active ? "#121416" : "currentColor"}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
			<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
		</svg>
	);
}
