import apiClient from "@/app/lib/client";
import Container from "@/app/ui/container";
import Title from "@/app/ui/title";
import Link from "next/link";

type Props = {
  params: { taskid: string };
};

export default async function TaskPage(props: Props) {
  const taskId = parseInt((await props.params).taskid);
  const { data, error } = await apiClient.GET("/tasks/{id}", {
    params: {
      path: { id: taskId },
    },
  });
  if (!data) {
    console.log(error);
    return (
      <Container>
        <Title>Error</Title>
        <p>Failed to load a task</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Task Detail</Title>
      <div className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium " htmlFor="title">
            Title
          </label>
          <input
            className="bg-slate-700 appearance-none rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none"
            type="text"
            id="title"
            name="title"
            placeholder="Task title ..."
            defaultValue={data.title}
            readOnly
          />
        </div>
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium "
            htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="bg-slate-700 appearance-none rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none"
            placeholder="Task description ..."
            defaultValue={data.description}
            readOnly
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>
            {/* <Link href={`/tasks/${taskId}/update`}>
              <button className="bg-teal-700 p-2 rounded-lg mr-4" type="button">
                <div className="flex flex-row items-center">
                  <MdEdit className="mr-2" />
                  <div>Edit</div>
                </div>
              </button>
            </Link> */}
            {/* <button
              className="bg-teal-700 p-2 rounded-lg mr-4"
              type="button"
              onClick={() => deleteTask(taskId)}>
              <div className="flex flex-row items-center">
                <MdDelete className="mr-2" />
                <div>Delete</div>
              </div>
            </button> */}
          </div>
          <Link href="/tasks">
            <button className="bg-teal-700 p-2 rounded-lg" type="button">
              Back
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
