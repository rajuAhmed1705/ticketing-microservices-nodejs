import { CategoryDoc } from "./category";
import { EmployeeDoc } from "./employee";
import { RequestTypeDoc } from "./request-type";
import autopopulate from "mongoose-autopopulate";
import mongoose from "mongoose";

interface LeaveRequestAttrs {
  employee: EmployeeDoc;
  requestType: RequestTypeDoc;
  category: CategoryDoc;
  purpose: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  status?: number;
  requestTo: EmployeeDoc;
  remarks?: string;
}

export interface LeaveRequestDoc extends mongoose.Document {
  employee: EmployeeDoc;
  requestType: RequestTypeDoc;
  category: CategoryDoc;
  purpose: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  status?: number;
  requestTo: EmployeeDoc;
  remarks: string;
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
      autopopulate: {
        select: ["personalDetails.fullName", "employeeInformation.employeeId"],
        maxDepth: 1,
      },
    },
    requestType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RequestType",
      required: true,
      autopopulate: true,
    },
    purpose: {
      type: String,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      autopopulate: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      default: null,
    },

    /**
     * @status
     * 0 --> pending
     * 1 --> approved
     * 2 --> rejected
     * 3 --> cancel
     */
    status: {
      type: Number,
      default: 0,
      min: 0,
    },
    requestTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      autopopulate: {
        select: ["personalDetails.fullName", "employeeInformation.employeeId"],
        maxDepth: 1,
      },
    },
    remarks: {
      type: String,
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

leaveRequestSchema.plugin(autopopulate);

leaveRequestSchema.statics.build = (attrs: LeaveRequestAttrs) => {
  return new LeaveRequest(attrs);
};

const LeaveRequest = mongoose.model<LeaveRequestDoc, LeaveRequestModel>(
  "LeaveRequest",
  leaveRequestSchema
);

export { LeaveRequest };
