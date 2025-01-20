import retry from "async-retry";
import database from "../infra/database";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearTables() {
  await database.query({
    text: "DELETE FROM prices;DELETE FROM products;DELETE FROM markets",
  });
}

const orchestrator = {
  waitForAllServices,
  clearTables,
};

export default orchestrator;
