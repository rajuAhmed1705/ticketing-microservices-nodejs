import mongoose from "mongoose";

interface DesignationAttrs {
  title: string;
  level: number;
  remark: string;
}

export interface DesignationDoc extends mongoose.Document {
  title: string;
  level: number;
  remark: string;
}

interface DesignationModel extends mongoose.Model<DesignationDoc> {
  build(attrs: DesignationAttrs): DesignationDoc;
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

designationSchema.statics.build = (attrs: DesignationAttrs) => {
  return new Designation(attrs);
};

const Designation = mongoose.model<DesignationDoc, DesignationModel>(
  "Designation",
  designationSchema
);

export { Designation };
