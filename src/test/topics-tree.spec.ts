import request from "supertest";
import { app } from "../app";
import { Topic } from "../topic/topic";
import { TopicTree } from "../topic/topic-tree";

describe("topics/", () => {

    it("should return topic tree", (done) => {
        return request(app)
            .get("/topics/tree/1")
            .expect(200)
            .end(function (err, res) {
                var tree = res.body as TopicTree;
                expect(tree.id).toEqual(1);
                expect(tree.name).toEqual("Main Topic");
                expect(tree.createdAt).not.toBeNull();
                expect(tree.updatedAt).not.toBeNull();
                expect(tree.version).not.toBeNull();
                expect(tree.children.length).toEqual(1);

                tree = tree.children[0];
                expect(tree.id).toEqual(2);
                expect(tree.name).toEqual("Secondary Topic");
                expect(tree.createdAt).not.toBeNull();
                expect(tree.updatedAt).not.toBeNull();
                expect(tree.version).not.toBeNull();
                expect(tree.children.length).toEqual(1);

                tree = tree.children[0];
                expect(tree.id).toEqual(3);
                expect(tree.name).toEqual("Last Topic");
                expect(tree.createdAt).not.toBeNull();
                expect(tree.updatedAt).not.toBeNull();
                expect(tree.version).not.toBeNull();
                expect(tree.children.length).toEqual(0);

                done();
            });
    });

    it("should return shortest path between topics", (done) => {
        return request(app)
            .get("/topics/path/1/3")
            .expect(200)
            .end(function (err, res) {
                var path = res.body as Topic[];
                expect(path.length).toEqual(3);
                expect(path[0].id).toEqual(1);
                expect(path[1].id).toEqual(2);
                expect(path[2].id).toEqual(3);

                done();
            });
    });
    it("should return shortest path between topics", (done) => {
        return request(app)
            .get("/topics/path/3/1")
            .expect(200)
            .end(function (err, res) {
                var path = res.body as Topic[];
                expect(path.length).toEqual(3);
                expect(path[0].id).toEqual(3);
                expect(path[1].id).toEqual(2);
                expect(path[2].id).toEqual(1);

                done();
            });
    });
});
