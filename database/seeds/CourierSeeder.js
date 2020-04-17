"use strict";

/*
|--------------------------------------------------------------------------
| CourierSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class CourierSeeder {
  async run() {
    const capacities = [10, 25, 35];

    await Promise.all(
      capacities.map(async (capacity) => {
        await Factory.model("App/Models/Courier").createMany(10, {
          max_capacity: capacity,
        });
      })
    );
  }
}

module.exports = CourierSeeder;
