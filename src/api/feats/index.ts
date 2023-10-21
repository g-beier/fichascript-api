import express from "express";
import FeatsController from "./Feats.controller";

const router = express.Router();

router.post("/", FeatsController.createFeat);
router.get("/", FeatsController.listFeats);
router.get("/:featId", FeatsController.findFeat);
router.get("/type/:featType", FeatsController.listFeatsByType);

export = router;
