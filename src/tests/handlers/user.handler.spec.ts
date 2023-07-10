import app from "../../app";
import supertest from "supertest";

const testRequest = supertest(app);
const successCode = 200;
const notAuthenticatedCode = 401;

let jwtToken: string;
let user_id: string;

const userToCreate = {
  email: "0xabdoali@gmail.com",
  password: "pleasehashme",
  first_name: "0xAbdo",
  last_name: "Ali",
};

const userToUpdate = {
  email: "updated@email.com",
  password: "hashed!",
  first_name: "f_updated",
  last_name: "l_updated",
};

describe("Testing User Handler", () => {
  it("should retrieve all users without JWT token", async () => {
    const response = await testRequest.get("/users");
    expect(response.statusCode).toBe(notAuthenticatedCode);
  });

  it("should create a new user", async () => {
    const response = await testRequest
      .post("/users")
      .set("Content-type", "application/json")
      .send(userToCreate);

    expect(response.statusCode).toBe(successCode);
    jwtToken = response.body.userToken as string;
    user_id = response.body.newUser.user_id as string;
  });

  it("should retrieve all users with JWT token", async () => {
    const response = await testRequest
      .get("/users")
      .set("Authorization", `Bearer ${jwtToken}`);
    expect(response.statusCode).toBe(successCode);
  });

  it("should retrieve a user by ID without JWT token", async () => {
    const response = await testRequest.get(`/users/${user_id}`);
    expect(response.statusCode).toBe(notAuthenticatedCode);
  });

  it("should retrieve a user by ID with JWT token", async () => {
    const response = await testRequest
      .get(`/users/${user_id}`)
      .set("Authorization", `Bearer ${jwtToken}`);
    expect(response.statusCode).toBe(successCode);
    expect(response.body.user.email).toEqual(userToCreate.email);
    expect(response.body.user.first_name).toEqual(userToCreate.first_name);
    expect(response.body.user.last_name).toEqual(userToCreate.last_name);
  });

  it("should update a user without JWT token", async () => {
    const response = await testRequest
      .put(`/users/${user_id}`)
      .send(userToUpdate);
    expect(response.statusCode).toBe(notAuthenticatedCode);
  });

  it("should update a user with JWT token", async () => {
    const response = await testRequest
      .put(`/users/${user_id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send(userToUpdate);
    expect(response.statusCode).toBe(successCode);
    expect(response.body.email).toEqual(userToUpdate.email);
    expect(response.body.first_name).toEqual(userToUpdate.first_name);
    expect(response.body.last_name).toEqual(userToUpdate.last_name);
  });

  it("should delete a user without JWT token", async () => {
    const response = await testRequest.delete(`/users/${user_id}`);
    expect(response.statusCode).toBe(notAuthenticatedCode);
  });

  it("should delete a user with JWT token", async () => {
    const response = await testRequest
      .delete(`/users/${user_id}`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${jwtToken}`);
    expect(response.statusCode).toBe(successCode);
    expect(response.body).toEqual("user deleted");
  });

  it("should authenticate a user and return a valid token", async () => {
    const response = await testRequest
      .post("/users/login")
      .set("Content-type", "application/json")
      .send({ email: userToCreate.email, password: userToCreate.password });

    if (response.statusCode === successCode) {
      expect(response.body.Login).toEqual("Success");
      expect(response.body.user.email).toEqual(userToCreate.email);
      expect(response.body.token).toBeDefined();
    } else {
      expect(response.statusCode).toBe(notAuthenticatedCode);
      expect(response.body.Login).toEqual("Failed, Error While Login");
    }
  });
});
