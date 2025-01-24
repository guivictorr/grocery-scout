const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
