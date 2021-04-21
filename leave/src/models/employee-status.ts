import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import EventAttrs from "../events/event-attrs";

interface EmployeeStatusAttrs {
  id: string;
  status: string;
}

export interface EmployeeStatusDoc extends mongoose.Document {
  status: string;
  version: number;
}

interface EmployeeStatusModel extends mongoose.Model<EmployeeStatusDoc> {
  build(attrs: EmployeeStatusAttrs): EmployeeStatusDoc;
  findByEvent(event: EventAttrs): Promise<EmployeeStatusDoc | null>;
}

const employeeStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      trim: true,
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

employeeStatusSchema.set("versionKey", "version");
employeeStatusSchema.plugin(updateIfCurrentPlugin);

employeeStatusSchema.statics.findByEvent = (event: EventAttrs) => {
  return EmployeeStatus.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

employeeStatusSchema.statics.build = (attrs: EmployeeStatusAttrs) => {
  return new EmployeeStatus({
    _id: attrs.id,
    status: attrs.status,
  });
};

const EmployeeStatus = mongoose.model<EmployeeStatusDoc, EmployeeStatusModel>(
  "EmployeeStatus",
  employeeStatusSchema
);

export { EmployeeStatus };
