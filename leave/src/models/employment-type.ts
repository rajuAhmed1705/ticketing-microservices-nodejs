import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import EventAttrs from "../events/event-attrs";

interface employmentTypeAttrs {
  id: string;
  name: string;
  remark: string;
}

export interface employmentTypeDoc extends mongoose.Document {
  name: string;
  remark: string;
  version: number;
}

interface employmentTypeModel extends mongoose.Model<employmentTypeDoc> {
  build(attrs: employmentTypeAttrs): employmentTypeDoc;
  findByEvent(event: EventAttrs): Promise<employmentTypeDoc | null>;
}

const employmentTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    timestamps: true,
  }
);

employmentTypeSchema.set("versionKey", "version");

employmentTypeSchema.plugin(updateIfCurrentPlugin);

employmentTypeSchema.statics.findByEvent = (event: EventAttrs) => {
  return EmploymentType.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

employmentTypeSchema.statics.build = (attrs: employmentTypeAttrs) => {
  return new EmploymentType({
    _id: attrs.id,
    name: attrs.name,
    remark: attrs.remark,
  });
};

const EmploymentType = mongoose.model<employmentTypeDoc, employmentTypeModel>(
  "EmploymentType",
  employmentTypeSchema
);

export { EmploymentType };
