import express,{ Router } from "express";
import ProfileController from "../controllers/Profile.controller";

let router:Router=express.Router();

router.route("/").post(ProfileController.create).get(ProfileController.findAll).put(ProfileController.update);
router.route('/:id').get(ProfileController.findById).delete(ProfileController.delete);



export default router;