import request from "supertest";
import { app } from "../app";
import { Resource, ResourceType } from "../resource/resource";

fdescribe("GET /", () => {

    it("should return resource", () => {
        return request(app)
            .get("/resources/1", function (err, res) {
                expect(res.body.id).not.toBeUndefined();
                expect(res.body.topicId).toEqual(1);
                expect(res.body.description).toEqual("Domain driven design");
                expect(res.body.url).toEqual("https://youtu.be/o-ym035R1eY?si=9kb4UOGZAQIdiQFd");
                expect(res.body.type).toEqual(ResourceType.Video);
            })
            .expect(200);
    });

    it("create should return resource", (done) => {
        const payload: Resource = {
            topicId: 2,
            type: ResourceType.Article,
            url: 'https://en.wikipedia.org/wiki/Software_testing',
            description: 'Test resource'
        };
        return request(app)
            .post("/resources")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(201)
            .end(function (err, res) {
                expect(res.body.id).not.toBeUndefined();
                expect(res.body.topicId).toEqual(2);
                expect(res.body.description).toEqual("Test resource");
                expect(res.body.url).toEqual("https://en.wikipedia.org/wiki/Software_testing");
                expect(res.body.type).toEqual(ResourceType.Article);
                done();
            });
    });

    it("create should not save invalid topic", (done) => {
        const payload: Resource = {
            topicId: 200,
            type: ResourceType.Article,
            url: 'https://en.wikipedia.org/wiki/Software_testing',
            description: 'Test resource'
        };
        return request(app)
            .post("/resources")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(400)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body.message).toEqual('Conflic error, related Topic does not exists 200');
                done();
            });
    });

    it("update should not save invalid topic", (done) => {
        const payload: Resource = {
            topicId: 200,
            type: ResourceType.Article,
            url: 'https://en.wikipedia.org/wiki/Software_testing',
            description: 'Test resource'
        };
        return request(app)
            .put("/resources")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(400)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body.message).toEqual('Conflic error, related Topic does not exists 200');
                done();
            });
    });

    it("create should not save invalid url", (done) => {
        const payload: Resource = {
            topicId: 2,
            type: ResourceType.Article,
            url: 'teste_ttestet',
            description: 'Test resource'
        };
        return request(app)
            .post("/resources")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(400)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body.message).toEqual('The url is invalid teste_ttestet');
                done();
            });
    });

    it("update should not save invalid url", (done) => {
        const payload: Resource = {
            topicId: 2,
            type: ResourceType.Article,
            url: 'teste_ttestet',
            description: 'Test resource'
        };
        return request(app)
            .put("/resources")
            .set({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .send(payload)
            .expect(400)
            .end(function (err, res) {
                expect(err).toBeNull();
                expect(res.body.message).toEqual('The url is invalid teste_ttestet');
                done();
            });
    });

    it("should delete 1", (done) => {
        return request(app)
            .delete("/resources/1")
            .expect(202)
            .end(function (err, res) {
                expect(err).toBeNull();
                done()
            });
    });

    it("get 10 should return entity not found", (done) => {
        return request(app)
            .get("/resources/10")
            .expect(204)
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });

    it("delete 10 return entity not found", (done) => {
        return request(app)
            .delete("/resources/10")
            .expect(204)
            .end(function (err, res) {
                expect(err).toBeNull();
                done();
            });
    });
});
