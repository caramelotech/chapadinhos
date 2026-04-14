import AccessLayout from "@/components/AccessLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Page() {
  return (
    <AccessLayout title="Criar uma conta" subtitle="Insira suas lorem ipsum">
      <form>
        <Input type="text" placeholder="Nome" />
        <Input type="email" placeholder="E-mail" />
        <Input type="password" placeholder="Senha" />
        <div className="mt-12 flex w-full">
          <Button text="Avançar" />
        </div>
      </form>
    </AccessLayout>
  );
}
