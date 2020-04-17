"use strict";

const { test, trait } = use("Test/Suite")("Courier Update");
const Factory = use("Factory");
const Courier = use("App/Models/Courier");

trait("DatabaseTransactions");
trait("Test/ApiClient");

test("try to update non existing courier", async ({ client }) => {
  const response = await client
    .post("/couriers")
    .type("json")
    .send({ id: 120, max_capacity: 15 })
    .end();

  response.assertStatus(404);
});

test("check update courier validation & sanitizers", async ({ client }) => {
  const user = await Factory.model("App/Models/Courier").create({
    max_capacity: 10,
  });

  const response = await client
    .post("/couriers")
    .type("json")
    .send({ id: user.id, max_capacity: "hola" })
    .end();

  response.assertStatus(400);
});

test("update courier max capacity", async ({ client, assert }) => {
  const initialCapacity = 1;
  const newCapacity = 30;
  const user = await Factory.model("App/Models/Courier").create({
    max_capacity: initialCapacity,
  });

  assert.equal(initialCapacity, user.max_capacity);

  const response = await client
    .post("/couriers")
    .type("json")
    .send({ id: user.id, max_capacity: newCapacity })
    .end();
  response.assertStatus(200);

  await user.reload();
  assert.equal(newCapacity, user.max_capacity);
  response.assertJSONSubset({
    data: {
      id: user.id,
      name: user.name,
      capacity: {
        max: user.max_capacity,
        updated_at: user.capacity_updated_at,
      },
    },
  });
});
