import { CategoryDoc } from "./category";
import { EmployeeDoc } from "./employee";
import mongoose from "mongoose";

interface LeaveTimelineAttrs {
  employee: EmployeeDoc;
  category: CategoryDoc;
  fromDate: Date;
  toDate: Date;
  totalDays: number;
}

interface LeaveTimelinDoc extends mongoose.Document {
  employee: EmployeeDoc;
  category: CategoryDoc;
  fromDate: Date;
  toDate: Date;
  totalDays: number;
}

interface LeaveTimelineModel extends mongoose.Model<LeaveTimelinDoc> {
  build(attrs: LeaveTimelineAttrs): LeaveTimelinDoc;
}

const leaveTimelineSchema = new mongoose.Schema({
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
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    default: null,
  },
  totalDays: {
    type: Number,
    min: 0,
  },
});

leaveTimelineSchema.statics.build = (attrs: LeaveTimelineAttrs) => {
  return new LeaveTimeline(attrs);
};

const LeaveTimeline = mongoose.model<LeaveTimelinDoc, LeaveTimelineModel>(
  "LeaveTimeline",
  leaveTimelineSchema
);

export { LeaveTimeline };
