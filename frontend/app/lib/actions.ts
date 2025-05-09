"use server";

import apiClient, { Task } from "@/app/lib/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const TaskSchema = z.object({
  title: z
    .string({ message: "title can not be empty" })
    .min(1, { message: "title can not be empty" }),
  description: z
    .string({ message: "description can not be empty" })
    .min(1, { message: "description can not be empty" }),
});

type TaskState = {
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string;
};

export async function createTask(
  prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  const validatedFields = TaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description } = validatedFields.data;

  const { data, error } = await apiClient.POST("/tasks", {
    body: {
      title,
      description,
    },
  });

  if (!data) {
    return { message: error.message };
  }

  console.log(`id = ${data.id}`);
  redirect("/tasks");
  return {};
}

export async function updateTask(
  prevState: TaskState,
  formData: FormData
): Promise<TaskState> {
  const validatedFields = TaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description } = validatedFields.data;

  const id = parseInt(formData.get("id") as string);

  const { data, error } = await apiClient.PUT("/tasks/{id}", {
    params: {
      path: {
        id: id,
      },
    },
    body: {
      title,
      description,
    },
  });

  if (error) {
    return { message: error.message };
  }

  redirect("/tasks");
  return {};
}

export async function getTask(taskId: number): Promise<Task | undefined> {
  const { data, error } = await apiClient.GET("/tasks/{id}", {
    params: {
      path: {
        id: taskId,
      },
    },
  });
  if (!data) {
    console.log(error);
    return;
  }

  return data;
}

export async function deleteTask(taskId: number) {
  const { error } = await apiClient.DELETE("/tasks/{id}", {
    params: {
      path: {
        id: taskId,
      },
    },
  });
  if (error) {
    console.log(error);
    return error;
  }
  revalidatePath("/tasks");
  return;
}
