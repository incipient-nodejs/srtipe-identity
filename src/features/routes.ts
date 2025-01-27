import { Router } from "express";
import StripeIdentity from "./stripe-identity/stripe.router";

const router = Router();

router.use("/stripe", StripeIdentity);

export default router;
