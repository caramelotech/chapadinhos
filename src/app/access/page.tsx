"use client";

import AccessLayout from "@/components/AccessLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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
      title="Fazer Login"
      subtitle="Acesse seu feed de desafios fitness"
    >
      <form>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        <Link href="/">Esqueceu sua senha?</Link>
        <div className="mt-10 flex w-full columns-2 gap-8">
          <Button
            text="Criar conta"
            onClick={() => router.push("/access/signup")}
          />
          <Button
            text={loading ? "Entrando..." : "Login"}
            type="submit"
            onClick={handleLogin}
          />
        </div>
      </form>
    </AccessLayout>
  );
}
