/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";
import Feat from "./Feats.model";

const createFeat = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc, require, _require, type } = req.body;
  const feat = new Feat({
    _id: new mongoose.Types.ObjectId(),
    title,
    desc,
    require,
    _require,
    type,
  });

  return await feat
    .save()
    .then((feat) => res.status(201).json({ feat }))
    .catch((err) => res.status(500).json({ err }));
};

const findFeat = async (req: Request, res: Response, next: NextFunction) => {
  const featId = req.params.featId;

  return await Feat.findById(featId)
    .then((feat) =>
      feat
        ? res.status(200).json(feat)
        : res.status(404).json({ message: "not found" })
    )
    .catch((err) => res.status(500).json({ err }));
};

const listFeats = async (req: Request, res: Response, next: NextFunction) => {
  return await Feat.find()
    .then((feats) => res.status(200).json(feats))
    .catch((err) => res.status(500).json({ err }));
};

const listFeatsByType = (req: Request, res: Response, next: NextFunction) => {
  const featType = req.params.featType;
  return Feat.find({ type: featType })
    .then((feats) => res.status(200).json(feats))
    .catch((err) => res.status(500).json({ err }));
};

const updateFeat = (req: Request, res: Response, next: NextFunction) => {};
const deleteFeat = (req: Request, res: Response, next: NextFunction) => {};

export default { createFeat, findFeat, listFeats, listFeatsByType };
