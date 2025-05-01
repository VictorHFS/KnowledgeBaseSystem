import { Topic } from "./topic";
import { TopicToTree, TopicTree } from "./topic-tree";
import { TopicService } from "./topic.service";

export class TopicTreeService {
    constructor(private _topicService: TopicService) { }


    findTree(id: number): TopicTree { //find last version

        var topic = this._topicService.find(id);
        var topics = this._topicService.findAllLastVersion();

        return this._buildTree(topic, topics);
    }

    private _buildTree(mainTopic: Topic, topics: Topic[]): TopicTree {
        var tree = TopicToTree(mainTopic);

        for (let index = 0; index < topics.length; index++) {
            const topic = topics[index];

            if (topic.parentTopicId === tree.id) {

                var child_tree = this._buildTree(topic, topics);

                tree.children.push(child_tree);
            }
        }

        return tree;
    }
}