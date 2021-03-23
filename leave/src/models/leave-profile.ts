import { CategoryDoc } from "./category";
import { EmployeeDoc } from "./employee";
import mongoose from "mongoose";

interface LeaveProfileAttrs {
  employee: EmployeeDoc;
  category: CategoryDoc;
  remainingLeave: number;
}

export interface LeaveProfileDoc extends mongoose.Document {
  employee: EmployeeDoc;
  category: CategoryDoc;
  remainingLeave: number;
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
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    remainingLeave: {
      type: Number,
      default: null,
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

leaveProfileSchema.statics.build = (attrs: LeaveProfileAttrs) => {
  return new LeaveProfile(attrs);
};

const LeaveProfile = mongoose.model<LeaveProfileDoc, LeaveProfileModel>(
  "LeaveProfile",
  leaveProfileSchema
);

export { LeaveProfile };
