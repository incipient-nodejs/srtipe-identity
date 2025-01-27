import { Router } from "express";
import { stripeIdentityController } from "./stripe.controller";

const router = Router();

router.route("/file/:fileId").get(stripeIdentityController.getStripeFile);

export default router;
