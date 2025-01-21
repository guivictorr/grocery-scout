import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import product from "@/models/product";
import { NotFoundError } from "@/infra/errors";

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

const getParamsSchema = z.object({
  ean: z.coerce.string().min(8).max(13).regex(/^\d+$/, {
    message: "The input must be a string of numbers (digits only).",
  }),
});
async function get(request: FastifyRequest, reply: FastifyReply) {
  const params = getParamsSchema.parse(request.params);
  const productResult = await product.findByEan(params.ean);

  reply.status(200).send(productResult.rows[0]);
}

const productsController = {
  post,
  get,
};

export default productsController;
