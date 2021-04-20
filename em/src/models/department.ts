import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface DepartmentAttrs {
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

departmentSchema.statics.build = (attrs: DepartmentAttrs) => {
  return new Department(attrs);
};

const Department = mongoose.model<DepartmentDoc, DepartmentModel>(
  "Department",
  departmentSchema
);

export { Department };
