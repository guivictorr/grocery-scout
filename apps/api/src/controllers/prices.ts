import price from "@/models/price";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const priceSchema = z.object({
  price_cents: z.number().positive(),
  productId: z.number().positive(),
  marketId: z.number().positive(),
});
async function post(request: FastifyRequest, reply: FastifyReply) {
  const { marketId, price_cents, productId } = priceSchema.parse(request.body);
  await price.create(price_cents, productId, marketId);
  reply.status(201).send({});
}

const pricesController = {
  post,
};

export default pricesController;
