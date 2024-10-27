"use client";
import { deleteTask } from "@/app/lib/actions";
import { MdDelete } from "react-icons/md";
import { useTransition } from "react";

type Props = {
  taskId: number;
  className?: string;
};

export default function DeleteButton(props: Props) {
  const [isPending, startTransition] = useTransition();
  function onDelete() {
    startTransition(async () => {
      const error = await deleteTask(props.taskId);
      if (error) {
        console.log(`failed to delete task ${props.taskId}`);
        return;
      }
      console.log(`task ${props.taskId} has been deleted`);
    });
  }

  return (
    <button className={props.className} onClick={onDelete}>
      <div className="flex justify-center">
        {isPending ? (
          <div className="animate-spin h-4 w-4 border-4 border-red-400 rounded-full border-t-transparent"></div>
        ) : (
          <MdDelete className="text-red-400 hover:text-red-700" />
        )}
      </div>
    </button>
  );
}
