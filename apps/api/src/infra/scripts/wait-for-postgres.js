const { exec } = require("node:child_process");
function checkPostgres() {
  exec(
    "docker exec grocery-scout-dev-db pg_isready --host localhost",
    handleReturn,
  );

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\n🟢 Accepting connections");
  }
}

process.stdout.write("\n\n🔴 Waiting postgres accept connections");
checkPostgres();
