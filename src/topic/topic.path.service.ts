import { Path } from "./path";
import { Topic } from "./topic";
import { TopicTreeService } from "./topic-tree.service";
import { TopicService } from "./topic.service";

export class TopicPathService {
    constructor(private _topicService: TopicService, private _treeService: TopicTreeService) { }

    findShortestPath(fromId: number, toId: number): Topic[] {
        var from = this._topicService.find(fromId);
        var to = this._topicService.find(toId);

        var tree = this._treeService.findWholeTree(from);

        var path = new Path(from, to, tree);
        return path.get();
    }

}