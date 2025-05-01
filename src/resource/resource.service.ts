import { TopicService } from "../topic/topic.service";
import { EntityService } from "../core/entity.service";
import { Resource, ResourceType } from "./resource";
import { StatusError } from "../topic/status.error";

export class ResourceService extends EntityService<Resource> {

    constructor(private topicService: TopicService) {
        super();
        this.create({
            topicId: 1,
            description: 'Domain driven design',
            url: 'https://youtu.be/o-ym035R1eY?si=9kb4UOGZAQIdiQFd',
            type: ResourceType.Video
        });
    }

    create(Entity: Resource): Resource {
        Entity.createdAt = new Date();

        if (!this.topicService.exists(Entity.topicId)) {
            throw new StatusError(400, `Conflic error, related Topic does not exists ${Entity.topicId}`);
        }

        if (!this._isValidHttpUrl(Entity.url)) {
            throw new StatusError(400, `The url is invalid ${Entity.url}`);
        }

        return super.create(Entity);
    }

    update(Entity: Resource): Resource {
        Entity.updatedAt = new Date();

        if (!this.topicService.exists(Entity.topicId)) {
            throw new StatusError(400, `Conflic error, related Topic does not exists ${Entity.topicId}`);
        }

        if (!this._isValidHttpUrl(Entity.url)) {
            throw new StatusError(400, `The url is invalid ${Entity.url}`);
        }

        return super.update(Entity);
    }

    private _isValidHttpUrl(urlString: string): boolean {
        let url;

        try {
            url = new URL(urlString);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }
}
