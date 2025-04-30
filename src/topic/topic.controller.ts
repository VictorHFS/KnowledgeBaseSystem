import { EntityService } from "../core/entity.service";
import { EntityController } from "../core/entity.controller";
import { Request, Response } from "express";
import { Topic } from "./topic";

export class TopicController extends EntityController<Topic> {

    constructor(_service: EntityService<Topic>) {
        super("/topics", _service);
    }

    override async post(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body) {
                throw new Error('Body is empty');
            }
            var data = this._service.create(req.body);
            res.json(data);
        } catch (e) {
            if (e.code) {

                res
                    .status(e.code)
                    .send({ message: e.message });
            } else {

                res.statusCode = 204; // content not found
                res.send(e);
            }
        }
    }
}