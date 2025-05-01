import { Router } from "express";
import * as controller from "../controllers/index";
import { UserController } from "..//user/user.controller";
import { UserService } from "../user/use.service";
import { TopicController } from "../topic/topic.controller";
import { TopicService } from "../topic/topic.service";
import { ResourceController } from "../resource/resource.controller";
import { ResourceService } from "../resource/resource.service";
import { TopicTreeService } from "../topic/topic-tree.service";

export const router = Router();

router.get("/", controller.index);
new UserController(new UserService());
var topicService = new TopicService();
var topicTreeService = new TopicTreeService(topicService);
new TopicController(topicService, topicTreeService);
new ResourceController(new ResourceService(topicService))
