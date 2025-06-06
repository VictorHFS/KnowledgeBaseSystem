import { Entity } from "./entity";
import { Request, Response } from "express";
import { EntityService } from "./entity.service";
import { router } from "../routes";

export class EntityController<T extends Entity> {

    constructor(public path: string, protected _service: EntityService<T>) {
        initializeRoute(this);
    }

    async get(req: Request, res: Response): Promise<void> {
        try {
            var data = this._service.find(Number(req.params["id"]));
            res.json(data);
        } catch (e) {
            if (e.code) {

                res
                    .status(e.code)
                    .send({ message: e.message });
            } else {

                res
                    .sendStatus(500);
            }
        }
    }

    async post(req: Request, res: Response): Promise<void> {
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

                res
                    .sendStatus(500);
            }
        }
    }

    async put(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body) {
                throw new Error('Body is empty');
            }

            var data = this._service.update(req.body);
            res.json(data);
        } catch (e) {
            if (e.code) {

                res
                    .status(e.code)
                    .send({ message: e.message });
            } else {

                res
                    .sendStatus(500);
            }
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
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
                    .sendStatus(500);
            }
        }
    }
}

export const initializeRoute = <T extends Entity>(controller: EntityController<T>) => {
    router.get(controller.path + "/:id", controller.get.bind(controller));
    router.post(controller.path, controller.post.bind(controller));
    router.put(controller.path, controller.put.bind(controller));
    router.delete(controller.path + "/:id", controller.delete.bind(controller));
}