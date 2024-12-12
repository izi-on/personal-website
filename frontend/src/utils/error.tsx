import { Toast, ToastFunction } from "@/hooks/use-toast";

export const toastErrorHandler =
  (toast: ToastFunction, config: Toast = {}) =>
  (err: Error) => {
    console.error(err);
    toast({
      title: "An error occurred",
      description: err.message,
      variant: "destructive",
      ...config,
    });
  };

export const withRethrow = (fn: (err: Error) => void) => (err: Error) => {
  fn(err);
  throw err;
};
