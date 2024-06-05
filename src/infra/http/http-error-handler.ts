import { ApplicationError } from "../../app/errors/application-error";
import { ValidationError } from "../../app/validators/validation-adapter";
import type { HttpRequest, HttpResponse } from "./http-adapter";

export const httpErrorHandler = (err: Error, req: HttpRequest, res: HttpResponse) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ errors: err.zodError.errors });
  }
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};