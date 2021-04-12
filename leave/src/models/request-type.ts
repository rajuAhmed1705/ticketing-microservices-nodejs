import mongoose from "mongoose";

/**
 * @status
 * approve request --> 0
 * cancel request --> 1
 * extend request --> 2
 */

interface RequestTypeAttrs {
  requestName: string;
  remarks: string;
  status: number;
}

export interface RequestTypeDoc extends mongoose.Document {
  requestName: string;
  remarks: string;
  status: number;
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
    status: {
      type: Number,
      required: true,
      min: 0,
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
