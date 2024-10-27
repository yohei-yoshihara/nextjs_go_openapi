import Container from "@/app/ui/container";
import CreateTaskForm from "@/app/ui/create-task-form";
import Title from "@/app/ui/title";

export default function CreateTaskPage() {
  return (
    <Container>
      <Title>Create Task</Title>
      <CreateTaskForm />
    </Container>
  );
}
