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
  // Alter the 'lat' column to DOUBLE PRECISION
  pgm.alterColumn("markets", "lat", {
    type: "double precision",
    notNull: true,
    using: "lat::double precision", // Cast existing values to DOUBLE PRECISION
  });

  // Alter the 'lon' column to DOUBLE PRECISION
  pgm.alterColumn("markets", "lon", {
    type: "double precision",
    notNull: true,
    using: "lon::double precision", // Cast existing values to DOUBLE PRECISION
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
