import { EntityService } from "./../core/entity.service";
import { Role } from "./role";
import { User } from "./user";

export class UserService extends EntityService<User> {

    constructor() {
        super();
        this.create({
            name: "Admin",
            email: "admin@admin.com",
            role: Role.Admin
        });
    }

    create(Entity: User): User {
        Entity.createdAt = new Date();
        return super.create(Entity);
    }
}
