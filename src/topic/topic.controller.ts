import { EntityService } from "../core/entity.service";
import { EntityController } from "../core/entity.controller";
import { Request, Response } from "express";
import { Topic } from "./topic";
import { router } from "../routes";
import { TopicService } from "./topic.service";
import { TopicTreeService } from "./topic-tree.service";

export class TopicController extends EntityController<Topic> {

    constructor(_service: TopicService, private _treeService: TopicTreeService) {
        super("/topics", _service);
        router.get(this.path + "/tree/:id", this.getTree.bind(this));
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
}