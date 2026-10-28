import { test, expect } from "@playwright/test";

test("API returns a list of users successfully", async ({ request }) => {
  const response = await request.get("https://jsonplaceholder.typicode.com/users");

  expect(response.status()).toBe(200);

  const users = await response.json();

  expect(Array.isArray(users)).toBe(true);
  expect(users.length).toBeGreaterThan(0);

  const firstUser = users[0];

  expect(firstUser).toHaveProperty("id");
  expect(firstUser).toHaveProperty("name");
  expect(firstUser).toHaveProperty("email");

  expect(typeof firstUser.id).toBe("number");
  expect(typeof firstUser.name).toBe("string");
  expect(typeof firstUser.email).toBe("string");
});
