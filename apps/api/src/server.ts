import Fastify, { FastifyInstance } from "fastify";
import statusController from "./controllers/status";
import productsController from "./controllers/products";
import marketsController from "./controllers/markets";
import pricesController from "./controllers/prices";
import { errorHandler, noMatchHandler } from "./handlers";

const fastify = Fastify();

fastify.setErrorHandler(errorHandler);
fastify.setNotFoundHandler(noMatchHandler);

fastify.register(handleV1Routes, { prefix: "/api/v1" });

fastify.listen({ port: 3000, host: "0.0.0.0" });

function handleV1Routes(app: FastifyInstance) {
  app.get("/status", statusController.get);
  app.post("/products", productsController.post);
  app.get("/products/:ean", productsController.get);
  app.post("/markets", marketsController.post);
  app.get("/markets", marketsController.get);
  app.post("/prices", pricesController.post);
  app.get("/prices/:marketId", pricesController.get);
}
