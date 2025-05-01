import { TopicService } from "../topic/topic.service";
import { TopicPathService } from "../topic/topic.path.service";
import { TopicTreeService } from "../topic/topic-tree.service";

describe("topic.path.service", () => {

    let service: TopicPathService;
    let topicService: TopicService;
    let treeService: TopicTreeService;

    beforeEach(() => {
        topicService = new TopicService();
        treeService = new TopicTreeService(topicService);
        service = new TopicPathService(topicService, treeService);
    });

    it("should return topic tree path (From Two 2 to Three)", () => {
        var one = topicService.create({
            name: 'One',
            content: 'TTest'
        });
        var two = topicService.create({
            name: 'Two',
            content: 'TTest 2',
            parentTopicId: one.id
        });
        var three = topicService.create({
            name: 'Three',
            content: 'TTest 3',
            parentTopicId: two.id
        });

        var two_2 = topicService.create({
            name: 'Two 2',
            content: 'TTest_2 2',
            parentTopicId: one.id
        });

        var path = service.findShortestPath(two_2.id, three.id);

        expect(path[0].name).toEqual('Two 2');
        expect(path[1].name).toEqual('One');
        expect(path[2].name).toEqual('Two');
        expect(path[3].name).toEqual('Three');
    });


    it("should return topic tree path (From Three to Two 2)", () => {
        var one = topicService.create({
            name: 'One',
            content: 'TTest'
        });
        var two = topicService.create({
            name: 'Two',
            content: 'TTest 2',
            parentTopicId: one.id
        });
        var three = topicService.create({
            name: 'Three',
            content: 'TTest 3',
            parentTopicId: two.id
        });

        var two_2 = topicService.create({
            name: 'Two 2',
            content: 'TTest_2 2',
            parentTopicId: one.id
        });

        var path = service.findShortestPath(three.id, two_2.id);

        expect(path[0].name).toEqual('Three');
        expect(path[1].name).toEqual('Two');
        expect(path[2].name).toEqual('One');
        expect(path[3].name).toEqual('Two 2');
    });

    it("should return topic tree path (From Two 2 to Two)", () => {
        var one = topicService.create({
            name: 'One',
            content: 'TTest'
        });
        var two = topicService.create({
            name: 'Two',
            content: 'TTest 2',
            parentTopicId: one.id
        });
        var three = topicService.create({
            name: 'Three',
            content: 'TTest 3',
            parentTopicId: two.id
        });

        var two_2 = topicService.create({
            name: 'Two 2',
            content: 'TTest_2 2',
            parentTopicId: one.id
        });

        var path = service.findShortestPath(two_2.id, two.id);

        expect(path[0].name).toEqual('Two 2');
        expect(path[1].name).toEqual('One');
        expect(path[2].name).toEqual('Two');
    });



    it("should return topic tree path", () => {
        var one = topicService.create({
            name: 'One',
            content: 'TTest'
        });
        var two = topicService.create({
            name: 'Two',
            content: 'TTest 2',
            parentTopicId: one.id
        });
        var three = topicService.create({
            name: 'Three',
            content: 'TTest 3',
            parentTopicId: two.id
        });

        var two_2 = topicService.create({
            name: 'Two 2',
            content: 'TTest_2 2',
            parentTopicId: one.id
        });

        var path = service.findShortestPath(three.id, one.id);

        expect(path[0].name).toEqual('Three');
        expect(path[1].name).toEqual('Two');
        expect(path[2].name).toEqual('One');
    });



});
