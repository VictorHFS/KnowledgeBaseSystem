import { TopicTreeService } from "../topic/topic-tree.service";
import { TopicService } from "../topic/topic.service";

describe("topic tree service", () => {

    let service: TopicTreeService;
    let topicService: TopicService;

    beforeEach(() => {
        topicService = new TopicService();
        service = new TopicTreeService(topicService);
    }); TopicTreeService

    it("should return topic tree", () => {
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

        topicService.update({
            ...one,
            content: 'One updated content'
        })
        topicService.update({
            ...two,
            content: 'Two updated content'
        })
        topicService.update({
            ...two_2,
            content: 'Two_2 updated content'
        })
        topicService.update({
            ...three,
            content: 'Tree updated content'
        })

        var tree = service.findTree(one.id);

        expect(tree.id).toEqual(one.id);
        expect(tree.name).toEqual('One');
        expect(tree.content).toEqual('One updated content');
        expect(tree.children.length).toEqual(2);

        var two_tree = tree.children[0];

        expect(two_tree.id).toEqual(two.id);
        expect(two_tree.name).toEqual('Two');
        expect(two_tree.content).toEqual('Two updated content');

        var two_2_tree = tree.children[1];

        expect(two_2_tree.id).toEqual(two_2.id);
        expect(two_2_tree.name).toEqual('Two 2');
        expect(two_2_tree.content).toEqual('Two_2 updated content');

        expect(two_tree.children.length).toEqual(1);

        var three_tree = two_tree.children[0];

        expect(three_tree.id).toEqual(three.id);
        expect(three_tree.name).toEqual('Three');
        expect(three_tree.content).toEqual('Tree updated content');

        expect(two_2_tree.children.length).toEqual(0);

    });

    it("should return topic tree", () => {

        var tree = service.findTree(1);

        expect(tree.id).toEqual(1);
        expect(tree.name).toEqual('Main Topic');
        expect(tree.content).toEqual('Empty Content');
        expect(tree.children.length).toEqual(1);

        var two_tree = tree.children[0];

        expect(two_tree.id).toEqual(2);
        expect(two_tree.name).toEqual('Secondary Topic');
        expect(two_tree.content).toEqual('Empty Content');

        expect(two_tree.children.length).toEqual(1);

        var three_tree = two_tree.children[0];

        expect(three_tree.id).toEqual(3);
        expect(three_tree.name).toEqual('Last Topic');
        expect(three_tree.content).toEqual('Empty Content');

        expect(three_tree.children.length).toEqual(0);

    });


});
