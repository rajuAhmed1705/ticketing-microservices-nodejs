import mongoose from "mongoose";

interface locationAttrs {
  name: string;
  remark: string;
}
export interface locationDoc extends mongoose.Document {
  name: string;
  remark: string;
}

interface locationModel extends mongoose.Model<locationDoc> {
  build(attrs: locationAttrs): locationDoc;
}

const locationSchema = new mongoose.Schema(
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

locationSchema.statics.build = (attrs: locationAttrs) => {
  return new JobLocation(attrs);
};

const JobLocation = mongoose.model<locationDoc, locationModel>(
  "JobLocation",
  locationSchema
);

export { JobLocation };
