import mongoose from "mongoose";

interface SeparationAttrs {
  type: string;
  remark: string;
}

export interface SeparationDoc extends mongoose.Document {
  type: string;
  remark: string;
}

interface SeparationModel extends mongoose.Model<SeparationDoc> {
  build(attrs: SeparationAttrs): SeparationDoc;
}

const separationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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

separationSchema.statics.build = (attrs: SeparationAttrs) => {
  return new Separation(attrs);
};

const Separation = mongoose.model<SeparationDoc, SeparationModel>(
  "Separation",
  separationSchema
);

export { Separation };
