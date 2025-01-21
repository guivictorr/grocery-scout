import database from "@/infra/database";

interface MarketDto {
  name: string;
  lat: number;
  long: number;
  id: number;
  createdAt: string;
}

async function create(name: string, lat: number, lon: number) {
  const newProductResult = await database.query<MarketDto>({
    text: "INSERT INTO markets (name,lat,lon) VALUES ($1, $2, $3) RETURNING *",
    values: [name, lat, lon],
  });
  const market = newProductResult.rows[0];

  return market;
}

async function list() {
  const marketsResult = await database.query<MarketDto>({
    text: "SELECT * FROM markets",
  });
  const markets = marketsResult.rows;
  return markets;
}

const market = {
  create,
  list,
};

export default market;
