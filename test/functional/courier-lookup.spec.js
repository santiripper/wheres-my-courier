"use strict";

const { test, trait } = use("Test/Suite")("Courier Lookup");
const Factory = use("Factory");

trait("DatabaseTransactions");
trait("Test/ApiClient");

test("check pagination structure with empty data", async ({ client }) => {
  const response = await client.get("/couriers/lookup").end();
  response.assertStatus(200);
  response.assertJSON({
    pagination: {
      total: 0,
      perPage: 20,
      page: 1,
      lastPage: 0,
    },
    data: [],
  });
});

test("check pagination with 2 pages ", async ({ client }) => {
  const perPage = 20;
  const totalUsers = perPage + 1;
  const users = await Factory.model("App/Models/Courier").createMany(
    totalUsers
  );

  const response = await client
    .get("/couriers/lookup")
    .query({ page: 2 })
    .end();
  response.assertStatus(200);
  response.assertJSONSubset({
    pagination: {
      total: totalUsers,
      perPage: 20,
      page: 2,
      lastPage: 2,
    },
  });
});

test("lookup empty couriers", async ({ client }) => {
  const response = await client.get("/couriers/lookup").end();
  response.assertStatus(200);
  response.assertJSONSubset({
    pagination: { total: 0 },
    data: [],
  });
});

test("lookup check response with 1 courier without filters", async ({
  client,
}) => {
  const user = await Factory.model("App/Models/Courier").create({
    max_capacity: 10,
  });

  const response = await client.get("/couriers/lookup").end();
  response.assertStatus(200);
  response.assertJSONSubset({
    pagination: { total: 1 },
    data: [
      {
        id: user.id,
        name: user.name,
        capacity: {
          max: user.max_capacity,
        },
      },
    ],
  });
});

test("lookup check response with 1 courier with filters", async ({
  client,
}) => {
  const user = await Factory.model("App/Models/Courier").create({
    max_capacity: 10,
  });

  const responseWithCapacity = await client
    .get("/couriers/lookup")
    .query({ capacity_required: 15 })
    .end();

  responseWithCapacity.assertStatus(200);
  responseWithCapacity.assertJSONSubset({
    pagination: { total: 0 },
  });
});

test("lookup search with capacity_required filter", async ({ client }) => {
  const usersWithMaxCapacity10 = await Factory.model(
    "App/Models/Courier"
  ).createMany(5, {
    max_capacity: 15,
  });

  const usersWithMaxCapacity30 = await Factory.model(
    "App/Models/Courier"
  ).createMany(18, {
    max_capacity: 30,
  });

  const responseCapacity30 = await client
    .get("/couriers/lookup")
    .query({ capacity_required: 30 })
    .end();
  responseCapacity30.assertJSONSubset({
    pagination: { total: usersWithMaxCapacity30.length },
  });

  const responseCapacity10 = await client
    .get("/couriers/lookup")
    .query({ capacity_required: 10 })
    .end();
  responseCapacity10.assertJSONSubset({
    pagination: {
      total: usersWithMaxCapacity30.length + usersWithMaxCapacity10.length,
    },
  });

  const responseCapacity0 = await client
    .get("/couriers/lookup")
    .query({ capacity_required: 100 })
    .end();
  responseCapacity0.assertJSONSubset({
    pagination: {
      total: 0,
    },
  });
});
