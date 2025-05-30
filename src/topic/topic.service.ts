import { EntityService } from "../core/entity.service";
import { Topic } from "./topic";
import { StatusError } from "../core/status.error";

export class TopicService extends EntityService<Topic> {

    constructor() {
        super();
        this.create({
            name: "Main Topic",
            content: "Empty Content"
        });
        this.create({
            name: "Secondary Topic",
            content: "Empty Content",
            parentTopicId: 1
        });
        this.create({
            name: "Last Topic",
            content: "Empty Content",
            parentTopicId: 2
        });
    }

    override create(Entity: Topic): Topic {
        Entity.createdAt = new Date();
        Entity.updatedAt = new Date();
        Entity.version = 1;

        if (Entity.parentTopicId && !this.exists(Entity.parentTopicId)) {
            throw new StatusError(400, 'Parent Topic ' + Entity.parentTopicId + ' don\'t exists')
        }
        return super.create(Entity);
    }

    private _checkParentingLoop(Entity: Topic): boolean {

        if (Entity.id && Entity.parentTopicId) {

            if (Entity.id == Entity.parentTopicId) {
                return true;
            }
            return this._checkForConflict(Entity.id, Entity.parentTopicId);
        }

        return false;
    }

    //example
    private _checkForConflictRecursive(entityId: number, parentId: number): boolean {

        if (!entityId) {
            return false;
        }

        if (this.exists(parentId)) {
            var parent = this.find(parentId);

            if (parent.parentTopicId && parent.parentTopicId === entityId) {
                return true;
            }

            return this._checkForConflict(entityId, parent.parentTopicId);
        }
        return false;
    }

    private _checkForConflict(entityId: number, parentId: number): boolean {

        if (!entityId) {
            return false;
        }
        var _parentId = parentId;
        while (_parentId) {
            if (this.exists(_parentId)) {
                var parent = this.find(_parentId);

                if (parent.parentTopicId && parent.parentTopicId === entityId) {
                    return true;
                }
            }
            _parentId = parent.parentTopicId;
        }

        return false;
    }

    override update(Entity: Topic): Topic { // add new version

        if (Entity.id === null || Entity.id <= 0) {
            throw new StatusError(404, 'Entity not found (' + Entity.id + ')');
        }

        if (!this.exists(Entity.id)) {
            throw new StatusError(404, 'Entity not found (' + Entity.id + ')');
        }

        if (Entity.id == Entity.parentTopicId || this._checkParentingLoop(Entity)) {
            throw new StatusError(400, 'Parent Topic ' + Entity.parentTopicId + ' for this records has a conflicting error.')
        }

        const _entity = this.find(Entity.id);

        Entity = {
            ...Entity,
            createdAt: _entity.createdAt,
            version: _entity.version + 1,
            updatedAt: new Date()
        }
        this.Entitys.push(Entity);
        return Entity;
    }

    override find(id: number): Topic { //find last version
        var topics = this.Entitys
            .filter(e => e.id === id)
            .sort((a, b) => a.updatedAt.getTime() < b.updatedAt.getTime() ? 1 : -1);

        if (topics.length === 0) {
            throw new StatusError(404, 'Entity not found (' + id + ')');
        }
        return topics[0];
    }

    findAllLastVersion(): Topic[] {
        var topicsFromLastUpdate: Map<number, Topic> = new Map();

        for (let index = 0; index < this.Entitys.length; index++) {
            const currTopic = this.Entitys[index];

            if (topicsFromLastUpdate.has(currTopic.id)) {
                var other = topicsFromLastUpdate.get(currTopic.id);

                if (currTopic.version > other.version) {
                    topicsFromLastUpdate.set(currTopic.id, currTopic);
                }
            } else {
                topicsFromLastUpdate.set(currTopic.id, currTopic);
            }
        }

        return Array.from(topicsFromLastUpdate.values());
    }

}

