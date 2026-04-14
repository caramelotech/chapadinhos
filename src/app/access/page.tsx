"use client";

import AccessLayout from "@/components/AccessLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleLogin() {
		setError(null);
		setLoading(true);
		const supabase = createClient();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			setError(error.message);
		} else {
			router.push("/dashboard");
			router.refresh();
		}
		setLoading(false);
	}

	return (
		<AccessLayout
			title="Bem-vindo de volta"
			subtitle="Acesse seu feed de desafios fitness"
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
			>
				<Input
					id="email"
					name="email"
					type="email"
					label="E-mail"
					placeholder="seu@email.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
					required
				/>
				<Input
					id="password"
					name="password"
					type="password"
					label="Senha"
					placeholder="••••••••"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					required
				/>
				{error && (
					<p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
						{error}
					</p>
				)}
				<div className="mb-5 flex justify-end">
					<Link
						href="/"
						className="text-sm text-on-surface-muted transition-colors hover:text-primary-lime"
					>
						Esqueceu a senha?
					</Link>
				</div>
				<Button
					text={loading ? "Entrando..." : "Entrar"}
					type="submit"
					variant="primary"
					disabled={loading}
				/>
				<div className="mt-5 text-center">
					<span className="text-sm text-on-surface-muted">Não tem conta? </span>
					<button
						type="button"
						onClick={() => router.push("/access/signup")}
						className="font-display text-sm font-semibold text-primary-lime transition-all hover:brightness-110"
					>
						Criar conta
					</button>
				</div>
			</form>
		</AccessLayout>
	);
}
