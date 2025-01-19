import { FastifyRequest, FastifyReply } from "fastify";
import { getDatabaseDependencies } from "@/models/health";

async function get(request: FastifyRequest, reply: FastifyReply) {
  const dependencies = await getDatabaseDependencies();
  reply.status(200).send(dependencies);
}

const statusController = {
  get,
};

export default statusController;
