import Fastify, { FastifyInstance } from "fastify";
import {
  BaseError,
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "./infra/errors";
import statusController from "./controllers/status";
import productsController from "./controllers/products";
import { ZodError } from "zod";
import marketsController from "./controllers/markets";

const fastify = Fastify();

fastify.register(handleV1Routes, { prefix: "/api/v1" });
fastify.setErrorHandler((error, request, reply) => {
  console.error(error);
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
});
fastify.setNotFoundHandler((request, reply) => {
  const notFoundError = new NotFoundError();
  reply.status(notFoundError.statusCode).send(notFoundError.toJSON());
});
fastify.listen({ port: 3000 });

function handleV1Routes(app: FastifyInstance) {
  app.get("/status", statusController.get);
  app.post("/products", productsController.post);
  app.get("/products/:ean", productsController.get);
  app.post("/markets", marketsController.post);
  app.get("/markets", marketsController.get);
}
