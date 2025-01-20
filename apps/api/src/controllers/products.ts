import product from "@/models/product";
import { FastifyRequest, FastifyReply } from "fastify";

async function post(request: FastifyRequest, reply: FastifyReply) {
  const { name, ean } = request.body;
  const productId = await product.create(name, ean);
  reply.status(201).send({ id: productId });
}

const productsController = {
  post,
};

export default productsController;
