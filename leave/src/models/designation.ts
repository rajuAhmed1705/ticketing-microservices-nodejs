import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import EventAttrs from "../events/event-attrs";

interface DesignationAttrs {
  id: string;
  title: string;
  level: number;
  remark?: string;
}

export interface DesignationDoc extends mongoose.Document {
  title: string;
  level: number;
  remark: string;
  version: number;
}

interface DesignationModel extends mongoose.Model<DesignationDoc> {
  build(attrs: DesignationAttrs): DesignationDoc;
  findByEvent(event: EventAttrs): Promise<DesignationDoc | null>;
}

const designationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    level: {
      type: Number,
      trim: true,
      required: true,
    },
    remark: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

designationSchema.set("versionKey", "version");
designationSchema.plugin(updateIfCurrentPlugin);

designationSchema.statics.findByEvent = (event: EventAttrs) => {
  return Designation.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

designationSchema.statics.build = (attrs: DesignationAttrs) => {
  return new Designation({
    _id: attrs.id,
    title: attrs.title,
    level: attrs.level,
    remark: attrs.remark,
  });
};

const Designation = mongoose.model<DesignationDoc, DesignationModel>(
  "Designation",
  designationSchema
);

export { Designation };
