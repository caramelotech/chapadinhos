"use client";

import AccessLayout from "@/components/AccessLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const logged = useState(false);

  if (logged) {
    //envia pra dashboard
  }
  return (
    <AccessLayout
      title="Fazer Login"
      subtitle="Accesar seu feed de desafios fitness"
    >
      <form>
        <Input type="email" placeholder="E-mail" />
        <Input type="password" placeholder="Senha" />
        <Link href="/">Esqueceu seu e-mail?</Link>
        <div className="mt-10 flex w-full columns-2 gap-8">
          <Button
            text="Criar conta"
            onClick={() => router.push("/access/signup")}
          />
          <Button text="Login" onClick={() => router.push("/dashboard")} />
        </div>
      </form>
    </AccessLayout>
  );
}
