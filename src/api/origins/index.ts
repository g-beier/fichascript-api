import express from "express";
import OriginsController from "./Origins.controller";

const router = express.Router();

router.post("/", OriginsController.createOrigin);
router.get("/", OriginsController.listOrigins);

export = router;
