/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";
import Origin from "./Origin.model";

const createOrigin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, desc, items, feats, skills } = req.body;
  const origin = new Origin({
    _id: new mongoose.Types.ObjectId(),
    title,
    desc,
    feats,
    skills,
    items,
  });

  return await origin
    .save()
    .then((origin) => res.status(201).json(origin))
    .catch((err) => res.status(500).json({ err }));
};

const listOrigins = async (req: Request, res: Response, next: NextFunction) => {
  return await Origin.find()
    .then((origins) => res.status(200).json(origins))
    .catch((err) => res.status(500).json({ err }));
};

export default { createOrigin, listOrigins };
