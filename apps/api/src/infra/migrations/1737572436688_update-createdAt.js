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
  pgm.alterColumn("markets", "created_at", {
    type: "timestamp(3)", // timestamp with 3 digits of fractional seconds
    notNull: true, // Ensure the column is not null (if required)
    default: pgm.func("NOW()"), // Set the default to NOW() with high precision
  });
  pgm.alterColumn("products", "created_at", {
    type: "timestamp(3)", // timestamp with 3 digits of fractional seconds
    notNull: true, // Ensure the column is not null (if required)
    default: pgm.func("NOW()"), // Set the default to NOW() with high precision
  });
  pgm.alterColumn("prices", "created_at", {
    type: "timestamp(3)", // timestamp with 3 digits of fractional seconds
    notNull: true, // Ensure the column is not null (if required)
    default: pgm.func("NOW()"), // Set the default to NOW() with high precision
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
