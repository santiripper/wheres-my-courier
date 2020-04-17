"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Courier extends Model {
  static get hidden() {
    return ["password", "email"];
  }

  static get dates() {
    return super.dates.concat(["capacity_updated_at"]);
  }

  static scopeWithCapacityFor(query, capacity_required) {
    return query.where("max_capacity", ">=", capacity_required);
  }
}

module.exports = Courier;
