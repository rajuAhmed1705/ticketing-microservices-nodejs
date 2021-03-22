import mongoose from "mongoose";

interface RequestTypeAttrs {
  requestName: string;
  remarks: string;
}

export interface RequestTypeDoc extends mongoose.Document {
  requestName: string;
  remarks: string;
}

interface RequestTypeModel extends mongoose.Model<RequestTypeDoc> {
  build(attrs: RequestTypeAttrs): RequestTypeDoc;
}

const requestTypeSchema = new mongoose.Schema(
  {
    requestName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    remarks: {
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

requestTypeSchema.statics.build = (attrs: RequestTypeAttrs) => {
  return new RequestType(attrs);
};

const RequestType = mongoose.model<RequestTypeDoc, RequestTypeModel>(
  "RequestType",
  requestTypeSchema
);

export { RequestType };
