import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import EventAttrs from "../events/event-attrs";

interface DepartmentAttrs {
  id: string;
  title: string;
  code: number;
  remark: string;
}
export interface DepartmentDoc extends mongoose.Document {
  title: string;
  code: number;
  remark: string;
  version: number;
}

interface DepartmentModel extends mongoose.Model<DepartmentDoc> {
  build(attrs: DepartmentAttrs): DepartmentDoc;
  findByEvent(event: EventAttrs): Promise<DepartmentDoc | null>;
}

const departmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
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

departmentSchema.set("versionKey", "version");
departmentSchema.plugin(updateIfCurrentPlugin);

departmentSchema.statics.findByEvent = (event: EventAttrs) => {
  return Department.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

departmentSchema.statics.build = (attrs: DepartmentAttrs) => {
  return new Department({
    _id: attrs.id,
    title: attrs.title,
    code: attrs.code,
    remark: attrs.remark,
  });
};

const Department = mongoose.model<DepartmentDoc, DepartmentModel>(
  "Department",
  departmentSchema
);

export { Department };
