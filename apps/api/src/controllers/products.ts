import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import product from "@/models/product";

const productSchema = z.object({
  name: z.string().min(3).max(50),
  ean: z.string().min(8).max(13).regex(/^\d+$/, {
    message: "The input must be a string of numbers (digits only).",
  }),
});

async function post(request: FastifyRequest, reply: FastifyReply) {
  const { name, ean } = productSchema.parse(request.body);

  const productId = await product.create(name, ean);
  reply.status(201).send({ id: productId });
}

const productsController = {
  post,
};

export default productsController;
