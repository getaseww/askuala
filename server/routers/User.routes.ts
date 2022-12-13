import express,{ Router } from "express";
import UserController from "../controllers/User.controller";


let router:Router=express.Router();

router.route("/").post(UserController.create).get(UserController.findAll).put(UserController.update);
router.route('/:id').get(UserController.findById).delete(UserController.delete);

export default router;
