import { CategoryDoc } from "./category";
import { EmployeeDoc } from "./employee";
import { RequestTypeDoc } from "./request-type";
import mongoose from "mongoose";

interface LeaveRequestAttrs {
  employee: EmployeeDoc;
  requestType: RequestTypeDoc;
  category: CategoryDoc;
  fromDate: Date;
  toDate: Date;
  status: number;
  requestTo: EmployeeDoc;
}

export interface LeaveRequestDoc extends mongoose.Document {
  employee: EmployeeDoc;
  requestType: RequestTypeDoc;
  category: CategoryDoc;
  fromDate: Date;
  toDate: Date;
  status: number;
  requestTo: EmployeeDoc;
}

interface LeaveRequestModel extends mongoose.Model<LeaveRequestDoc> {
  build(attrs: LeaveRequestAttrs): LeaveRequestDoc;
}

const leaveRequestSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    requestType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RequestType",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      default: null,
    },
    status: {
      type: Number,
      default: 0,
      min: 0,
    },
    requestTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
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

leaveRequestSchema.statics.build = (attrs: LeaveRequestAttrs) => {
  return new LeaveRequest(attrs);
};

const LeaveRequest = mongoose.model<LeaveRequestDoc, LeaveRequestModel>(
  "LeaveRequest",
  leaveRequestSchema
);

export { LeaveRequest };
