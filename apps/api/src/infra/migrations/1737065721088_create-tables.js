/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("products", {
    id: "id",
    created_at: { type: "timestamp", default: "now()" },
    name: { type: "text", notNull: true },
    ean: { type: "text", notNull: true, unique: true },
  });
  pgm.createTable("markets", {
    id: "id",
    created_at: { type: "timestamp", default: "now()" },
    name: { type: "text", notNull: true },
    lat: { type: "real", notNull: true },
    lon: { type: "real", notNull: true },
  });
  pgm.createTable("prices", {
    id: "id",
    created_at: { type: "timestamp", default: "now()" },
    price: { type: "real", notNull: true },
    productId: {
      type: "integer",
      notNull: true,
      references: "products(id)",
      onDelete: "CASCADE",
    },
    marketId: {
      type: "integer",
      notNull: true,
      references: "markets(id)",
      onDelete: "CASCADE",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
