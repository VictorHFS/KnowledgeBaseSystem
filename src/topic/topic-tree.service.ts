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

    findWholeTree(topic: Topic): TopicTree { //find last version

        var root = topic;
        var topics = this._topicService.findAllLastVersion();

        if (topic.parentTopicId) {
            root = this._findTreeRoot(root, topics);
        }

        return this._buildTree(root, topics);
    }

    private _findTreeRoot(from: Topic, topics: Topic[]): Topic {
        var root = from;
        while (true) {
            var curr: Topic = topics.find(t => t.id === root.parentTopicId);
            if (!curr) {
                break;
            } else {
                root = curr;
            }
        }
        return root;
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