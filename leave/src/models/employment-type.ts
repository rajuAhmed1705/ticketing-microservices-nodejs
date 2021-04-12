import mongoose from "mongoose";

interface employmentTypeAttrs {
  name: string;
  remark?: string;
}

export interface employmentTypeDoc extends mongoose.Document {
  name: string;
  remark?: string;
}

interface employmentTypeModel extends mongoose.Model<employmentTypeDoc> {
  build(attrs: employmentTypeAttrs): employmentTypeDoc;
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

employmentTypeSchema.statics.build = (attrs: employmentTypeAttrs) => {
  return new EmploymentType(attrs);
};

const EmploymentType = mongoose.model<employmentTypeDoc, employmentTypeModel>(
  "EmploymentType",
  employmentTypeSchema
);

export { EmploymentType };
