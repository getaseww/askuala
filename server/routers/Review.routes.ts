import express,{ Router } from "express";
import ReviewController from "../controllers/Review.controller";

let router:Router=express.Router();
router.route("/").post(ReviewController.create).get(ReviewController.findAll).put(ReviewController.update);
router.route('/:id').get(ReviewController.findById).delete(ReviewController.delete);

export default router;