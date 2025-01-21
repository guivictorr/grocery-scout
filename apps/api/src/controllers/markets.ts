import market from "@/models/market";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

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

const marketsController = {
  post,
};

export default marketsController;
