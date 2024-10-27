import Container from "@/app/ui/container";
import Title from "@/app/ui/title";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/tasks");
  return (
    <Container>
      <Title>Todo App</Title>
    </Container>
  );
}
