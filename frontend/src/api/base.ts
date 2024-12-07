import { createHttpClient } from "@/utils/http_client";

export const backendClient = createHttpClient().withUrl(
  import.meta.env.VITE_BACKEND_URL,
);
