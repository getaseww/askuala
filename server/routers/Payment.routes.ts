import express,{ Router } from "express";
import PaymentController from "../controllers/Payment.controller";

let router:Router=express.Router();
router.route("/").post(PaymentController.create).get(PaymentController.findAll).put(PaymentController.update);
router.route('/:id').get(PaymentController.findById).delete(PaymentController.delete);


export default router;