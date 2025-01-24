import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import market from "@/models/market";

const marketSchema = z.object({
  name: z.string().min(3).max(50),
  lat: z.number(),
  lon: z.number(),
});

async function post(request: FastifyRequest, reply: FastifyReply) {
  const { name, lat, lon } = marketSchema.parse(request.body);
  const marketResult = await market.create(name, lat, lon);
  reply.status(201).send(marketResult);
}
async function get(request: FastifyRequest, reply: FastifyReply) {
  const marketResult = await market.list();
  reply.status(200).send(marketResult);
}

const marketsController = {
  post,
  get,
};

export default marketsController;
