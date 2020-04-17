"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CouriersInitialMigrationSchema extends Schema {
  up() {
    this.create("couriers", (table) => {
      table.increments();
      table.string("name", 80).notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      //table.boolean("is_available").defaultTo(0).notNullable();
      table.integer("max_capacity").notNullable();
      table.timestamp("capacity_updated_at");
      table.timestamps();
    });
  }

  down() {
    this.drop("couriers");
  }
}

module.exports = CouriersInitialMigrationSchema;
