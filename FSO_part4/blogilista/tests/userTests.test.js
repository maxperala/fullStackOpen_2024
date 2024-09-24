const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const {describe, test, after, beforeEach} = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");

beforeEach(async () => {
    await User.deleteMany({});
})



describe("register new tests", () => {
    test("Successful registeration", async () => {
        const response = await api.post("/api/users/register").send({
            username: "teppo_tulppu",
            name: "Teppo Tulppu",
            password: "teponsalis"
        })
        assert.strictEqual(response.status, 201);
    })
    test("User already exists", async () => {

        // Add an istance with the same username as a base
        await api.post("/api/users/register").send({
            username: "teppo_tulppu",
            name: "Sami Saari",
            password: "teponsalis"
        })

        const response = await api.post("/api/users/register").send({
            username: "teppo_tulppu",
            name: "Sami Saari",
            password: "teponsalis2"
        })
        assert.strictEqual(response.status, 400);
    })

})




after(async () => {
    await  mongoose.connection.close();
})