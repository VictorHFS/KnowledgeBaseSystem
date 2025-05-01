import request from "supertest";
import { app } from "../app";
import { User } from "../user/user";
import { Role } from "../user/role";

describe("users/", () => {

    it("should return user", () => {
        return request(app)
            .get("/users/1", function (err, res) {
                expect(res.body.id).toEqual(1);
                expect(res.body.name).toEqual("Admin");
                expect(res.body.email).toEqual("admin@admin.com");
            })
            .expect(200);
    });

    it("should return user", (done) => {
        const payload: User = {
            name: "John",
            email: "john99@gmail.com",
            role: Role.Viewer
        };
        return request(app)
            .post("/users")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(201)
            .end(function (err, res) {
                expect(res.body.id).toEqual(2);
                expect(res.body.name).toEqual("John");
                expect(res.body.email).toEqual("john99@gmail.com");
                expect(res.body.createdAt).not.toBeNull();
                done();
            });
    });

    it("should delete 1", (done) => {
        return request(app)
            .delete("/users/1")
            .expect(202)
            .end(function (err, res) {
                expect(err).toBeNull();
                done()
            });
    });

    it("get 10 should return entity not found", (done) => {
        return request(app)
            .get("/users/10")
            .expect(204)
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });

    it("delete 10 return entity not found", (done) => {
        return request(app)
            .delete("/users/10")
            .expect(204)
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });
});
