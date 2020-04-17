"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Hash = use("Hash");

Factory.blueprint("App/Models/Courier", async (faker, i, data) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    max_capacity: data.max_capacity || 10,
    capacity_updated_at: data.capacity_updated_at || new Date(),
    created_at: new Date(),
  };
});
