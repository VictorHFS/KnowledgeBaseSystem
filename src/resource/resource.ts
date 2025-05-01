
import { Entity } from "../core/entity";

export interface Resource extends Entity {
    topicId: number;
    url: string;
    description: string;
    type: ResourceType;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum ResourceType {
    Video, Article, Pdf
}