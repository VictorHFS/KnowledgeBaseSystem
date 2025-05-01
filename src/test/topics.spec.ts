import request from "supertest";
import { app } from "../app";
import { Topic } from "../topic/topic";

describe("GET /", () => {

    it("should return topic", () => {
        return request(app)
            .get("/topics/1", function (err, res) {
                expect(res.body.id).toEqual(1);
                expect(res.body.name).toEqual("Main Topic");
                expect(res.body.content).toEqual("Empty Content");
                expect(res.body.createdAt).not.toBeNull();
                expect(res.body.updatedAt).not.toBeNull();
                expect(res.body.version).not.toBeNull();
            })
            .expect(200);
    });

    it("should update and retrieve topic version 2", (done) => {
        const payload: Topic = {
            id: 1,
            name: "Test Main Topic",
            content: "lorem ipsum",
        };
        return request(app)
            .put("/topics")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(201)
            .end(function (err, res) {
                expect(res.body.id).not.toBeNull();
                expect(res.body.name).toEqual("Test Main Topic");
                expect(res.body.content).toEqual("lorem ipsum");
                expect(res.body.parentTopicId).toBeUndefined();
                expect(res.body.createdAt).not.toBeUndefined();
                expect(res.body.updatedAt).not.toBeUndefined();
                expect(res.body.version).not.toBeUndefined();

                request(app)
                    .get("/topics/1")
                    .end(function (err, res) {
                        expect(res.body.id).toEqual(1);
                        expect(res.body.name).toEqual("Test Main Topic");
                        expect(res.body.content).toEqual("lorem ipsum");
                        expect(res.body.createdAt).not.toBeNull();
                        expect(res.body.updatedAt).not.toBeNull();
                        expect(res.body.version).not.toBeUndefined();
                        done();
                    })
                    .expect(200);
            });
    });

    it("should save topic without parent", (done) => {
        const payload: Topic = {
            name: "Test Topic",
            content: "lorem ipsum",
        };
        return request(app)
            .post("/topics")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(201)
            .end(function (err, res) {
                expect(res.body.id).not.toBeNull();
                expect(res.body.name).toEqual("Test Topic");
                expect(res.body.content).toEqual("lorem ipsum");
                expect(res.body.createdAt).not.toBeUndefined();
                expect(res.body.updatedAt).not.toBeUndefined();
                expect(res.body.version).not.toBeUndefined();
                done();
            });
    });

    it("should save topic with parent", (done) => {
        const payload: Topic = {
            name: "Test Topic",
            content: "lorem ipsum",
            parentTopicId: 1
        };
        return request(app)
            .post("/topics")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(201)
            .end(function (err, res) {
                expect(res.body.id).not.toBeNull();
                expect(res.body.name).toEqual("Test Topic");
                expect(res.body.content).toEqual("lorem ipsum");
                expect(res.body.parentTopicId).toEqual(1);
                expect(res.body.createdAt).not.toBeUndefined();
                expect(res.body.updatedAt).not.toBeUndefined();
                expect(res.body.version).not.toBeUndefined();
                done();
            });
    });

    it("should update topic without parent", (done) => {
        const payload: Topic = {
            id: 1,
            name: "Test Main Topic",
            content: "lorem ipsum",
        };
        return request(app)
            .put("/topics")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(201)
            .end(function (err, res) {
                expect(res.body.id).not.toBeNull();
                expect(res.body.name).toEqual("Test Main Topic");
                expect(res.body.content).toEqual("lorem ipsum");
                expect(res.body.parentTopicId).toBeUndefined();
                expect(res.body.createdAt).not.toBeUndefined();
                expect(res.body.updatedAt).not.toBeUndefined();
                expect(res.body.version).not.toBeUndefined();;
                done();
            });
    });

    it("should update topic with parent", (done) => {
        const payload: Topic = {
            id: 2,
            name: "Test Secondary Topic",
            content: "lorem ipsum",
            parentTopicId: 1
        };
        return request(app)
            .put("/topics")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(201)
            .end(function (err, res) {
                expect(res.body.id).not.toBeNull();
                expect(res.body.name).toEqual("Test Secondary Topic");
                expect(res.body.content).toEqual("lorem ipsum");
                expect(res.body.parentTopicId).toEqual(1);
                expect(res.body.createdAt).not.toBeUndefined();
                expect(res.body.updatedAt).not.toBeUndefined();
                expect(res.body.version).not.toBeUndefined();
                done();
            });
    });

    it("should not update topic with self parenting", (done) => {
        const payload: Topic = {
            id: 1,
            name: "Test Main Topic",
            content: "lorem ipsum",
            parentTopicId: 1
        };
        return request(app)
            .put("/topics")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(400)
            .end(function (err, res) {
                expect(res.body.message).toEqual('Parent Topic 1 for this records has a conflicting error.');
                done();
            });
    });

    it("should not update topic with looping parenting", (done) => {
        const payload: Topic = {
            id: 1,
            name: "Test Main Topic",
            content: "lorem ipsum",
            parentTopicId: 2
        };
        return request(app)
            .put("/topics")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(400)
            .end(function (err, res) {
                expect(res.body.message).toEqual('Parent Topic 2 for this records has a conflicting error.');
                done();
            });
    });

    it("should not save topic with parent that don\'t exists", (done) => {
        const payload: Topic = {
            name: "Test Topic",
            content: "lorem ipsum",
            parentTopicId: 150
        };
        return request(app)
            .post("/topics")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(400)
            .end(function (err, res) {
                expect(res.body.message).toEqual('Parent Topic 150 don\'t exists');
                done();
            });
    });

    it("should delete 1", (done) => {
        return request(app)
            .delete("/topics/1")
            .expect(202)
            .end(function (err, res) {
                expect(err).toBeNull();
                done()
            });
    });

    it("get 10 should return entity not found", (done) => {
        return request(app)
            .get("/topics/10")
            .expect(204)
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });

    it("delete 10 return entity not found", (done) => {
        return request(app)
            .delete("/topics/10")
            .expect(204)
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });
});
