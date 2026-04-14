import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <Link href="/dashboard">
        <Button text="Ir para Dashboard 🠒" />
      </Link>
      <Link href="/access">
        <Button text="Login 🠒" />
      </Link>
    </div>
  );
}
