import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.get("/", () => ({ hello: "world" }));

fastify.listen({ port: 3000 });
