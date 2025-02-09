import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import price from "@/models/price";

const priceSchema = z.object({
  price_cents: z.number().positive(),
  productId: z.number().positive(),
  marketId: z.coerce.number().positive(),
});

async function post(request: FastifyRequest, reply: FastifyReply) {
  const { marketId, price_cents, productId } = priceSchema.parse(request.body);
  await price.create(price_cents, productId, marketId);
  reply.status(201).send({});
}
async function get(request: FastifyRequest, reply: FastifyReply) {
  const { marketId } = priceSchema
    .pick({ marketId: true })
    .parse(request.params);
  const prices = await price.list(marketId);
  reply.status(200).send(prices);
}

const pricesController = {
  post,
  get,
};

export default pricesController;
