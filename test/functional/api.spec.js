"use strict";

const { test, trait } = use("Test/Suite")("Api");
trait("DatabaseTransactions");
trait("Test/ApiClient");

test("check api dummy root response", async ({ client }) => {
  const response = await client.get("/").end();
  response.assertStatus(200);
  response.assertJSON({
    stuart: "hello",
    version: 1,
  });
});
