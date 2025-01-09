import { Router as ExpressRouter } from "express";
import authMiddleware from "../middleware/auth";
import responseMiddleware from "../middleware/response";

class Router {
  constructor(options) {
    this.router = ExpressRouter();

    this.router.use(responseMiddleware);

    if (options?.auth) {
      this.router.use(authMiddleware);
    }
    return this.router;
  }
}

export default Router;