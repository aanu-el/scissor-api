import { Router, Request, Response } from "express";
import { urlRedirect } from "../controllers/index.controller";

const UrlRedirectRouter: Router = Router();

UrlRedirectRouter.get("/:backHalf", urlRedirect);

export default UrlRedirectRouter;