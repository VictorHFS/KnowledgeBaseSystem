import { Topic } from "./topic";

export interface TopicTree {
    id: number;
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
    children: TopicTree[];
}

export function TopicToTree(topic: Topic): TopicTree {
    return {
        id: topic.id,
        name: topic.name,
        content: topic.content,
        createdAt: topic.createdAt,
        updatedAt: topic.updatedAt,
        version: topic.version,
        children: [],
    };
}