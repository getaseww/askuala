import express,{ Router } from "express";
import EducationController from "../controllers/Education.controller";

let router:Router=express.Router();

router.route("/").post(EducationController.create).get(EducationController.findAll).put(EducationController.update);
router.route('/:id').get(EducationController.findById).delete(EducationController.delete);


export default router;