import { EntityService } from "../core/entity.service";
import { Topic } from "./topic";
import { TopicError } from "./topic.error";

export class TopicService extends EntityService<Topic> {

    constructor() {
        super();
        this.create({
            name: "Main Topic",
            content: "Empty Content"
        });
    }

    create(Entity: Topic): Topic {
        Entity.createdAt = new Date();
        Entity.updatedAt = new Date();
        Entity.version = 1;

        if (Entity.parentTopicId && !this.exists(Entity.parentTopicId)) {
            throw new TopicError(400, 'Parent Topic ' + Entity.parentTopicId + ' don\'t exists')
        }
        return super.create(Entity);
    }
}
