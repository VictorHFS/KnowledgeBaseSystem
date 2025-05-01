import { EntityService } from "../core/entity.service";
import { EntityController } from "../core/entity.controller";
import { Resource } from "./resource";

export class ResourceController extends EntityController<Resource> {

    constructor(_service: EntityService<Resource>) {
        super("/resources", _service);
    }
}