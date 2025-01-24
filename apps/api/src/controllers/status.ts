import { FastifyRequest, FastifyReply } from "fastify";
import health from "@/models/health";

async function get(request: FastifyRequest, reply: FastifyReply) {
  const dependencies = await health.status();
  reply.status(200).send(dependencies);
}

const statusController = {
  get,
};

export default statusController;
