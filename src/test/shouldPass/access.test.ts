import { it, describe, expect, afterAll } from "vitest";
import { app } from "../../app.js";
import request from "supertest";
import { registerUserData, loginUserData } from "../data/accessData.js";
import { userTable } from "../../db/schema.js";
import { deleteData } from "../../model/dbActions.js";
let userId: number = 0;

afterAll(async () => {
  await deleteData(userTable, userId);
});

describe(app, () => {
  it("Should create a customer", async () => {
    const response = await request(app)
      .post("/register")
      .send(registerUserData);
    userId = response.body[0].userId;
    expect(response.status).toBe(201);
    expect(response.body[0].name).toBe(registerUserData.name);
  });
  it("Should login a customer", async () => {
    const response = await request(app).post("/login").send(loginUserData);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logged in");
  });
});
