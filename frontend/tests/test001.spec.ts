import { test, expect } from "@playwright/test";

test("task list", async ({ page }) => {
  await page.goto("/tasks");
  const title = await page.getByTestId("task-1-title");
  await expect(title).toContainText("Task 0");

  await expect(page).toHaveTitle(/Todo App/);
});

test("create a task", async ({ page }) => {
  await page.goto("/tasks");
  await page.getByText("Create New Task").click();
  await expect(page.getByRole("heading")).toContainText("Create Task");
  await page.getByLabel("Title").fill("Task 999");
  await page.getByLabel("Description").fill("Task 999 description");
  await page.getByRole("button", { name: "Create" }).click();
  const task = await page.getByText("Task 999");
  await expect(task.first()).toBeVisible();
});
