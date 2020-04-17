"use strict";
const { formatters } = use("Validator");

class UpdateCourier {
  get rules() {
    return {
      id: "required",
      max_capacity: "required|integer|min:1|max:500",
    };
  }

  get sanitizationRules() {
    return {
      max_capacity: "to_int",
    };
  }

  get formatter() {
    return formatters.JsonApi;
  }
}

module.exports = UpdateCourier;
