import { CategoryDoc } from "./category";
import { EmployeeDoc } from "./employee";
import autopopulate from "mongoose-autopopulate";
import mongoose from "mongoose";

interface LeaveProfileAttrs {
  employee: EmployeeDoc;
  category: CategoryDoc;
  remainingLeave: number | null;
  createdBy?: EmployeeDoc;
  updatedBy?: EmployeeDoc;
}

export interface LeaveProfileDoc extends mongoose.Document {
  employee: EmployeeDoc;
  category: CategoryDoc;
  remainingLeave: number | null;
  createdBy?: EmployeeDoc;
  updatedBy?: EmployeeDoc;
}

interface LeaveProfileModel extends mongoose.Model<LeaveProfileDoc> {
  build(attrs: LeaveProfileAttrs): LeaveProfileDoc;
}

const leaveProfileSchema = new mongoose.Schema(
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      autopopulate: true,
    },
    remainingLeave: {
      type: Number,
      default: null,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
      autopopulate: {
        select: ["personalDetails.fullName", "employeeInformation.employeeId"],
        maxDepth: 1,
      },
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
      autopopulate: {
        select: ["personalDetails.fullName", "employeeInformation.employeeId"],
        maxDepth: 1,
      },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
      virtuals: true,
    },
    timestamps: true,
  }
);

leaveProfileSchema.plugin(autopopulate);

leaveProfileSchema.statics.build = (attrs: LeaveProfileAttrs) => {
  return new LeaveProfile(attrs);
};

const LeaveProfile = mongoose.model<LeaveProfileDoc, LeaveProfileModel>(
  "LeaveProfile",
  leaveProfileSchema
);

export { LeaveProfile };
