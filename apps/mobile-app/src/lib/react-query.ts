import { api } from "@/api/api-client";
import { queryOptions } from "@tanstack/react-query";

export interface PriceDto {
  price_cents: number;
  product_name: string;
  id: number;
}
export interface MarketDto {
  name: string;
  lat: number;
  long: number;
  id: number;
  createdAt: string;
}
export interface ProductDto {
  id: number;
  name: string;
  ean: string;
  createdAt: string;
}

export const queryKeys = {
  markets: ["markets"] as const,
  prices: ["prices"] as const,
  marketPrices: (marketId: string) => [...queryKeys.prices, marketId] as const,
  products: ["products"] as const,
  product: (ean: string) => [queryKeys.products, ean],
};

const findProductQuery = (ean: string) =>
  queryOptions({
    queryFn: () => api.get(`products/${ean}`),
    queryKey: queryKeys.product(ean),
    select: ({ data }) => data,
  });
const listPricesQuery = (marketId: string) =>
  queryOptions({
    queryFn: () => api.get<PriceDto[]>(`prices/${marketId}`),
    queryKey: queryKeys.marketPrices(marketId),
    select: ({ data }) => data,
  });
const listMarketsQuery = queryOptions({
  queryFn: () => api.get<MarketDto[]>("markets"),
  queryKey: queryKeys.markets,
  select: ({ data }) => data,
});

const queries = {
  listMarketsQuery,
  listPricesQuery,
  findProductQuery,
};

export default queries;
