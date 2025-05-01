import { EntityService } from "../core/entity.service";
import { EntityController } from "../core/entity.controller";
import { Request, Response } from "express";
import { Topic } from "./topic";

export class TopicController extends EntityController<Topic> {

    constructor(_service: EntityService<Topic>) {
        super("/topics", _service);
    }
}