import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { SiTask } from "react-icons/si";

import DeleteButton from "@/app/ui/delete-button";
import { Task } from "@/app/lib/client";

type Props = {
  task: Task;
};

export default function TaskRow(props: Props) {
  const task = props.task;
  return (
    <div className="group flex flex-row ml-3">
      <Link className="w-1/3" href={`/tasks/${task.id}`}>
        <div className="flex flex-row items-center ">
          <SiTask className="text-gray-300 group-hover:text-teal-300 mr-2" />
          <div
            className="text-white group-hover:text-teal-300 font-bold"
            data-testid={`task-${task.id}-title`}>
            {task.title}
          </div>
        </div>
      </Link>
      <Link href={`/tasks/${task.id}/update`}>
        <MdEdit className="mr-4 text-blue-400 hover:text-blue-700" />
      </Link>
      <DeleteButton taskId={task.id} />
    </div>
  );
}
