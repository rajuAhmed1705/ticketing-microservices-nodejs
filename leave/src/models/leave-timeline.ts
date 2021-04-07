import { CategoryDoc } from "./category";
import { EmployeeDoc } from "./employee";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import { LeaveRequestDoc } from "./leave-request";

interface LeaveTimelineAttrs {
  employee: EmployeeDoc;
  category: CategoryDoc;
  request?: LeaveRequestDoc;
  fromDate: Date;
  toDate: Date;
  duration: number;
  active?: boolean;
  remarks?: string;
}

export interface LeaveTimelinDoc extends mongoose.Document {
  employee: EmployeeDoc;
  category: CategoryDoc;
  request?: LeaveRequestDoc;
  fromDate: Date;
  toDate: Date;
  duration: number;
  active: boolean;
  remarks: string;
}

interface LeaveTimelineModel extends mongoose.Model<LeaveTimelinDoc> {
  build(attrs: LeaveTimelineAttrs): LeaveTimelinDoc;
}

const leaveTimelineSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      autopopulate: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      autopopulate: true,
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeaveRequest",
      default: null,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
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

leaveTimelineSchema.plugin(autopopulate);

leaveTimelineSchema.statics.build = (attrs: LeaveTimelineAttrs) => {
  return new LeaveTimeline(attrs);
};

const LeaveTimeline = mongoose.model<LeaveTimelinDoc, LeaveTimelineModel>(
  "LeaveTimeline",
  leaveTimelineSchema
);

export { LeaveTimeline };
