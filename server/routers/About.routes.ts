import express,{ Router } from "express";
import AboutController from "../controllers/About.controller";

let router:Router=express.Router();
router.route("/").post(AboutController.create).get(AboutController.findAll).put(AboutController.update);
router.route('/:id').get(AboutController.findById).delete(AboutController.delete);


export default router;