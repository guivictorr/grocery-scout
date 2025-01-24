import { ZodError } from "zod";
import {
  ValidationError,
  BaseError,
  InternalServerError,
  NotFoundError,
} from "./infra/errors";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    const propertyName = error.issues[0].path[0];
    const errorMessage = error.issues[0].message;
    const validationError = new ValidationError(
      propertyName.toString(),
      errorMessage,
    );
    return reply
      .status(validationError.statusCode)
      .send(validationError.toJSON());
  }
  if (error instanceof BaseError) {
    return reply.status(error.statusCode).send(error.toJSON());
  }

  const internalError = new InternalServerError({ cause: error });
  console.error(internalError);
  reply.status(internalError.statusCode).send(internalError.toJSON());
}

export function noMatchHandler(request: FastifyRequest, reply: FastifyReply) {
  const notFoundError = new NotFoundError(
    "This route doesn't exists.",
    "Check if the url or http verb is correct.",
  );
  reply.status(notFoundError.statusCode).send(notFoundError.toJSON());
}
