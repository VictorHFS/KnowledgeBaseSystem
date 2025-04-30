
import { Entity } from "../core/entity";

export interface Topic extends Entity {
    name: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
    parentTopicId?: number;
}