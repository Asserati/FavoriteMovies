export const getErrorMessage = (err: unknown): string => {
  let message: string;
  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === "string") {
    message = err;
  } else if (err && typeof err === "object" && "message" in err) {
    message = String(err.message);
  } else {
    message = "Unknown error";
  }
  return message;
};
