import { EntityService } from "../core/entity.service";
import { EntityController } from "../core/entity.controller";
import { Request, Response } from "express";
import { Topic } from "./topic";
import { router } from "../routes";

export class TopicController extends EntityController<Topic> {

    constructor(_service: EntityService<Topic>) {
        super("/topics", _service);
        router.get(this.path + "/:id", this.delete.bind(this));
    }

    async getTree(req: Request, res: Response): Promise<void> {
        try {
            this._service.delete(Number(req.params['id']));
            res.sendStatus(202);
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