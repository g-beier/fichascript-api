import { type ObjectId } from "mongodb";
import mongoose, { type Document, Schema } from "mongoose";

export interface IOrigin {
  title: string;
  desc: string;
  feats: ObjectId[];
  skills: ObjectId[];
  items: string[];
}

export interface IOriginModel extends IOrigin, Document {}

const OriginSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    feats: { type: Array, required: true },
    skills: { type: Array, required: true },
    items: { type: Array<string>, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<IOriginModel>("Origin", OriginSchema);
