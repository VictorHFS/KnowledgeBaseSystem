
import { Entity } from "./../core/entity";
import { Role } from "./role";

export interface User extends Entity {
    name: string;
    email: string;
    role: Role;
    createdAt?: Date;
}