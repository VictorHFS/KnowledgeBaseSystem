import { EntityService } from "../core/entity.service";
import { EntityController } from "../core/entity.controller";
import { User } from "./user";

export class UserController extends EntityController<User> {

    constructor(_service: EntityService<User>) {
        super("/users", _service);
    }
}