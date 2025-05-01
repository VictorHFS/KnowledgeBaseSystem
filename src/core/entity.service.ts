import { Entity } from "./entity";
import { StatusError } from "./status.error";


export class EntityService<T extends Entity> {
    protected Entitys: T[] = [];
    sequence: number = 0;

    find(id: number): T {
        var response = this.Entitys.find(e => e.id === id);
        if (!response) {
            throw new StatusError(204, 'Entity not found (' + id + ')');
        }

        return response;
    }

    exists(id: number): boolean {
        var response = this.Entitys.find(e => e.id === id);
        return !!response;
    }

    create(Entity: T): T {
        Entity.id = ++this.sequence;
        this.Entitys.push(Entity);
        return Entity;
    }

    update(Entity: T): T {
        if (Entity.id === null || Entity.id <= 0) {
            throw new StatusError(204, 'Entity not found (' + Entity.id + ')');
        }

        const index = this.Entitys.findIndex(u => Entity.id === u.id);
        if (index < 0) {
            throw new StatusError(204, 'Entity not found (' + Entity.id + ')');
        }

        this.Entitys[index] = Entity;
        return Entity;
    }

    delete(id: number) {
        if (!this.exists(id)) {
            throw new StatusError(204, 'Entity not found (' + id + ')');
        }
        this.Entitys = this.Entitys.filter(u => u.id === id);
    }
}
