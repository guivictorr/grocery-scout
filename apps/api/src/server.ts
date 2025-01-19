import Fastify, { FastifyInstance } from "fastify";
import { InternalServerError } from "./infra/errors";
import { statusController } from "./controllers/status";

const fastify = Fastify();

fastify.register(handleV1Routes, { prefix: "/api/v1" });
fastify.setErrorHandler((error, request, reply) => {
  const internalError = new InternalServerError({ cause: error });
  console.error(internalError);
  reply.status(internalError.statusCode).send(internalError.toJSON());
});
fastify.listen({ port: 3000 });

function handleV1Routes(app: FastifyInstance) {
  app.get("/status", statusController);
}
