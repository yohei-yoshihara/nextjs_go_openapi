import Container from "@/app/ui/container";
import Title from "@/app/ui/title";
import apiClient from "@/app/lib/client";
import TaskRow from "@/app/ui/task-row";
import Link from "next/link";

export default async function TaskListPage() {
  const { data, error } = await apiClient.GET("/tasks");
  if (!data) {
    console.error(error);
    return <Container>Failed to load a task list.</Container>;
  }

  return (
    <Container>
      <Title>Task List</Title>
      <ul className="mb-5 divide-y-2 divide-dotted divide-gray-600">
        {data.map((task) => {
          return (
            <li
              data-testid={`task-${task.id}`}
              key={task.id}
              className="pt-1 pb-1">
              <TaskRow task={task} />
            </li>
          );
        })}
      </ul>
      <Link className="bg-teal-500 rounded-lg p-2" href="/tasks/create">
        Create New Task
      </Link>
    </Container>
  );
}
