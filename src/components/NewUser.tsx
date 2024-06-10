import { Card, Button, TextInput, Title, Badge } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";
import { useState } from "react";

export function NewUser() {
  const { addUser } = useUserActions();
  const [result, setResult] = useState<"ok" | "ko" | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;

    if (!name || !email || !github) {
      setResult("ko");
      return;
    }
    addUser({ name, email, github });
    setResult("ok");
    form.reset();
  };

  return (
    <Card className="w-1/3">
      <Title className="my-2 text-center">New user</Title>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 justify-start"
      >
        <TextInput name="name" placeholder="Ingresa el nombre" />
        <TextInput name="email" placeholder="email@gmail.com" />
        <TextInput name="github" placeholder="Usuario de github" />
        <div>
          <Button className="mt-2">Guardar</Button>
          <span className="w-full">
            {result === "ok" && (
              <Badge className="bg-green-100 border-green-300 text-green-600">
                Se guardo el usuario correctamente.
              </Badge>
            )}
            {result === "ko" && (
              <Badge className="bg-red-100 border-red-300 text-red-600">
                Todos los campos son requeridos.
              </Badge>
            )}
          </span>
        </div>
      </form>
    </Card>
  );
}
