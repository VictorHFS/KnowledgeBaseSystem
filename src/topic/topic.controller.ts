import { EntityService } from "../core/entity.service";
import { EntityController } from "../core/entity.controller";
import { Request, Response } from "express";
import { Topic } from "./topic";
import { router } from "../routes";
import { TopicService } from "./topic.service";
import { TopicTreeService } from "./topic-tree.service";
import { TopicPathService } from "./topic.path.service";

export class TopicController extends EntityController<Topic> {

    constructor(_service: TopicService,
        private _treeService: TopicTreeService,
        private _pathService: TopicPathService) {
        super("/topics", _service);
        router.get(this.path + "/tree/:id", this.getTree.bind(this));
        router.get(this.path + "/path/:a/:b", this.getShortestPath.bind(this));
    }

    async getTree(req: Request, res: Response): Promise<void> {
        try {
            var tree = this._treeService.findTree(Number(req.params['id']));
            res.json(tree);
        } catch (e) {
            if (e.code) {

                res
                    .status(e.code)
                    .send({ message: e.message });
            } else {

                res
                    .sendStatus(500);// content not found
            }
        }
    }
    async getShortestPath(req: Request, res: Response): Promise<void> {
        try {
            var path = this._pathService.findShortestPath(Number(req.params['a']), Number(req.params['b']));
            res.json(path);
        } catch (e) {
            if (e.code) {

                res
                    .status(e.code)
                    .send({ message: e.message });
            } else {

                res
                    .sendStatus(500);// content not found
            }
        }
    }
}