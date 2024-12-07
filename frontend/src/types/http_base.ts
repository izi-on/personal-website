import { ZodType } from "zod";

export type method = "get" | "post" | "put" | "delete";

export type httpClientConfig = {
  baseURL?: string;
  path?: string;
  params?: Record<string, string>;
  headers?: Record<string, string>;
  method?: method;
  timeout?: number;
  validationSchema: ZodType;
};
