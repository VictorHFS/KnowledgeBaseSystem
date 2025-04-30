import { Router } from "express";
import * as controller from "../controllers/index";
import { UserController } from "..//user/user.controller";
import { UserService } from "../user/use.service";

export const router = Router();

router.get("/", controller.index);
new UserController(new UserService());


