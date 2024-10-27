"use client";
import Form from "next/form";
import { createTask } from "@/app/lib/actions";
import { useActionState } from "react";
import Spinning from "./spinning";

export default function CreateTaskForm() {
  const [error, formAction, isPending] = useActionState(createTask, {});

  return (
    <Form className="max-w-sm mx-auto" action={formAction}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium " htmlFor="title">
          Title
        </label>
        <input
          className="bg-slate-700 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-gray-600 focus:border-teal-500"
          type="text"
          id="title"
          name="title"
          placeholder="Task title ..."
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
          Create
        </button>
      </div>
      {isPending && <Spinning />}
    </Form>
  );
}
