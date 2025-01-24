import { api } from "@/api/api-client";
import { MarketDto, PriceDto, ProductDto } from "./queries";
import { AxiosResponse } from "axios";

interface NewMarketRequest {
  name: string;
  lat: number;
  lon: number;
}
const createMarket = () => ({
  mutationFn: (data: NewMarketRequest) =>
    api.post<NewMarketRequest, MarketDto>("markets", data),
});
interface NewPriceRequest {
  price_cents: number;
  productId: number;
  marketId: number;
}
const createPrice = () => ({
  mutationFn: (data: NewPriceRequest) =>
    api.post<NewPriceRequest, PriceDto>("prices", data),
});
interface NewProductRequest {
  name: string;
  ean: string;
}
const createProduct = () => ({
  mutationFn: (data: NewProductRequest) =>
    api.post<NewProductRequest, AxiosResponse<ProductDto>>("products", data),
});

const mutations = {
  createProduct,
  createPrice,
  createMarket,
};

export default mutations;
