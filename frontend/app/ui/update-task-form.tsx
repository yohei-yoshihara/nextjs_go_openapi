"use client";
import Form from "next/form";
import { updateTask } from "@/app/lib/actions";
import { useActionState } from "react";
import { Task } from "@/app/lib/client";
import Spinning from "./spinning";

type Props = {
  task: Task;
};

export default function UpdateTaskForm(props: Props) {
  const [error, formAction, isPending] = useActionState(updateTask, {});

  return (
    <Form className="max-w-sm mx-auto" action={formAction}>
      <div className="mb-5">
        <input type="hidden" name="id" value={props.task.id} />
        <label className="block mb-2 text-sm font-medium " htmlFor="title">
          Title
        </label>
        <input
          className="bg-slate-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600 focus:border-teal-500"
          type="text"
          id="title"
          name="title"
          placeholder="Task title ..."
          defaultValue={props.task.title}
        />
        {error.errors?.title && (
          <p className="mt-2 text-sm text-red-600">{error.errors.title}</p>
        )}
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
          className="bg-slate-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600 focus:border-teal-500"
          placeholder="Task description ..."
          defaultValue={props.task.description}
        />
        {error.errors?.description && (
          <p className="mt-2 text-sm text-red-600">
            {error.errors.description}
          </p>
        )}
      </div>
      <div>
        <button
          className="bg-teal-700 p-2 rounded-lg "
          type="submit"
          disabled={isPending}>
          Update
        </button>
      </div>
      {isPending && <Spinning />}
    </Form>
  );
}
