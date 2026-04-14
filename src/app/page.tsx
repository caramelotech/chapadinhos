import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-full flex-col items-center justify-center gap-6 p-6">
			<div className="text-center">
				<h1 className="font-display text-display-lg font-bold tracking-tight text-on-surface">
					chapa<span className="text-primary-lime">.</span>
				</h1>
				<p className="mt-3 font-body text-base text-on-surface-muted">
					Desafios de atividade física entre amigos
				</p>
			</div>
			<div className="flex w-full max-w-[280px] flex-col gap-3">
				<Link href="/access">
					<Button text="Fazer login" variant="primary" />
				</Link>
				<Link href="/access/signup">
					<Button text="Criar conta" variant="secondary" />
				</Link>
			</div>
		</div>
	);
}
