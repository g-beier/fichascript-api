import type { ObjectId } from "mongodb";
import mongoose, { type Document, Schema } from "mongoose";

export interface IFeat {
  title: string;
  desc: string;
  require: string;
  _require: IFeatRequirements;
  type: string[];
}

interface IFeatRequirements {
  att_for?: number;
  att_des?: number;
  att_con?: number;
  att_int?: number;
  att_sab?: number;
  att_car?: number;
  level?: number;
  feats?: ObjectId[];
  race?: ObjectId;
  origin?: ObjectId;
}

export interface IFeatModel extends IFeat, Document {}

const FeatSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    require: {
      type: String,
      required: function () {
        return Object.keys(this).includes("_require");
      },
    },
    _require: { type: Object, required: false },
  },
  { versionKey: false }
);

export default mongoose.model<IFeatModel>("Feat", FeatSchema);
