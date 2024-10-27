import { getTask } from "@/app/lib/actions";
import Container from "@/app/ui/container";
import Title from "@/app/ui/title";
import UpdateTaskForm from "@/app/ui/update-task-form";

type Props = {
  params: {
    taskid: string;
  };
};

export default async function UpdateTaskPage(props: Props) {
  const taskId = parseInt((await props.params).taskid);
  const task = await getTask(taskId);
  if (!task) {
    return (
      <Container>
        <Title>Error</Title>
        <p>Failed to get the task</p>
      </Container>
    );
  }
  return (
    <Container>
      <Title>Update Task</Title>
      <UpdateTaskForm task={task} />
    </Container>
  );
}
