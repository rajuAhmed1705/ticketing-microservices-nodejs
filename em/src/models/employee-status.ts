import mongoose from "mongoose";

interface EmployeeStatusAttrs {
  status: string;
}

export interface EmployeeStatusDoc extends mongoose.Document {
  status: string;
}

interface EmployeeStatusModel extends mongoose.Model<EmployeeStatusDoc> {
  build(attrs: EmployeeStatusAttrs): EmployeeStatusDoc;
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

employeeStatusSchema.statics.build = (attrs: EmployeeStatusAttrs) => {
  return new EmployeeStatus(attrs);
};

const EmployeeStatus = mongoose.model<EmployeeStatusDoc, EmployeeStatusModel>(
  "EmployeeStatus",
  employeeStatusSchema
);

export { EmployeeStatus };
