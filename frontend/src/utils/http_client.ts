import { ZodType, z } from "zod";
import axios from "axios";
import { httpClientConfig, method as Method } from "@/types/http_base";

export const createHttpClient = <T = unknown>() => {
  // Initial state
  const initialState: httpClientConfig = {
    baseURL: undefined,
    path: "",
    params: {},
    method: undefined,
    headers: {},
    timeout: 5000,
    validationSchema: z.any() as ZodType<T>,
  };

  // Helper function to create new chain with updated state
  const createChain = <U>(currentState: httpClientConfig) => ({
    withUrl: (baseURL: string) =>
      createChain({
        ...currentState,
        baseURL: baseURL,
      }),
    withParams: (params: Record<string, string>) =>
      createChain({
        ...currentState,
        params: { ...params },
      }),
    withMethod: (method: Method) =>
      createChain({
        ...currentState,
        method: method,
      }),
    withHeaders: (headers: Record<string, string>) =>
      createChain({
        ...currentState,
        headers: { ...currentState.headers, ...headers },
      }),
    withTimeout: (timeout: number) =>
      createChain({
        ...currentState,
        timeout,
      }),
    withPath: (path: string) =>
      createChain({
        ...currentState,
        path: `${currentState.path}${path}`,
      }),
    withResponseValidation: <V>(validationSchema: ZodType<V>) =>
      createChain<V>({
        ...currentState,
        validationSchema,
      }),
    apply: () => (): Promise<U> =>
      axios({
        ...currentState,
        baseURL: `${currentState.baseURL}${currentState.path}`,
      })
        .then((response) => response.data)
        .then(currentState.validationSchema.parse),
  });

  // Return initial chain
  return createChain(initialState);
};
