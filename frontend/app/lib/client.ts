import createClient from "openapi-fetch";
import { paths, components } from "@/app/lib/api";

const apiClient = createClient<paths>({
  baseUrl: "http://localhost:8000/api",
});

export default apiClient;

export type Task = components["schemas"]["Task"];
