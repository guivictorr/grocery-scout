import Fastify, { FastifyInstance } from "fastify";
import { BaseError, InternalServerError, NotFoundError } from "./infra/errors";
import statusController from "./controllers/status";
import productsController from "./controllers/products";

const fastify = Fastify();

fastify.register(handleV1Routes, { prefix: "/api/v1" });
fastify.setErrorHandler((error, request, reply) => {
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
}
