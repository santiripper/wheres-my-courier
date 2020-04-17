"use strict";

const BumblebeeTransformer = use("Bumblebee/Transformer");

/**
 * CourierTransformer class
 *
 * @class CourierTransformer
 * @constructor
 */
class CourierTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      name: model.name,
      capacity: {
        max: model.max_capacity,
        updated_at: model.capacity_updated_at,
      },
    };
  }
}

module.exports = CourierTransformer;
