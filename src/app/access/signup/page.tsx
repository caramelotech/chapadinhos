"use client";

import AccessLayout from "@/components/AccessLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSignup() {
		setError(null);
		setLoading(true);
		const supabase = createClient();
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { display_name: name },
			},
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
			title="Criar conta"
			subtitle="Comece seus desafios fitness hoje"
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSignup();
				}}
			>
				<Input
					id="name"
					name="name"
					type="text"
					label="Nome"
					placeholder="Seu nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoComplete="name"
					required
				/>
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
					autoComplete="new-password"
					required
				/>
				{error && (
					<p className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
						{error}
					</p>
				)}
				<Button
					text={loading ? "Criando conta..." : "Criar conta"}
					type="submit"
					variant="primary"
					disabled={loading}
				/>
				<div className="mt-5 text-center">
					<span className="text-sm text-on-surface-muted">Já tem conta? </span>
					<button
						type="button"
						onClick={() => router.push("/access")}
						className="font-display text-sm font-semibold text-primary-lime transition-all hover:brightness-110"
					>
						Fazer login
					</button>
				</div>
			</form>
		</AccessLayout>
	);
}
