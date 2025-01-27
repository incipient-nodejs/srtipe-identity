import { NextFunction, Request, Response } from "express";
import { TResponse } from "../../utils/commonInterface";
import * as StripeIdentity from "./stripe.provider";

export const stripeIdentityController = {
  getStripeFile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileId } = req.params;

      if (!fileId) {
        res.status(400).json({ message: "File ID is required" });
        return;
      }

      const { code, data }: TResponse = await StripeIdentity.getStripeFile(
        fileId
      );
      res.status(code).json(data);
      return;
    } catch (error) {
      next(error);
    }
  },
};
