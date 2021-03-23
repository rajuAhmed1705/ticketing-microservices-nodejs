import mongoose from "mongoose";
import { DepartmentDoc } from "./department";
import { DesignationDoc } from "./designation";
import { EmployeeStatusDoc } from "./employee-status";
import { employmentTypeDoc } from "./employment-type";
import { ReligionDoc } from "./religion";
import autopopulate from "mongoose-autopopulate";
import { createLeaveProfile } from "../middleware/DB/leave-profile-create";

interface EmployeeAttrs {
  personalDetails: {
    fullName: string;
    religion: ReligionDoc;
  };
  employeeInformation: {
    employeeId: string;
    companyId: string;
    department: DepartmentDoc;
    designation: DesignationDoc;
    employmentType: employmentTypeDoc;
    reportingTo?: EmployeeDoc;
    employeeStatus: EmployeeStatusDoc;
  };
}

export interface EmployeeDoc extends mongoose.Document {
  personalDetails: {
    fullName: string;
    religion: ReligionDoc;
  };
  employeeInformation: {
    employeeId: string;
    companyId: string;
    department: DepartmentDoc;
    designation: DesignationDoc;
    employmentType: employmentTypeDoc;
    reportingTo?: EmployeeDoc;
    employeeStatus: EmployeeStatusDoc;
  };
}

interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
  build(attrs: EmployeeAttrs): EmployeeDoc;
}

const employeeSchema = new mongoose.Schema(
  {
    personalDetails: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      religion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Religion",
        default: null,
        autopopulate: true,
      },
    },
    employeeInformation: {
      employeeId: {
        type: String,
        trim: true,
        unique: true,
        required: true,
      },
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        default: null,
        autopopulate: true,
      },

      designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
        default: null,
        autopopulate: true,
      },
      employmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmploymentType",
        default: null,
        autopopulate: true,
      },
      reportingTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        default: null,
        autopopulate: {
          select: [
            "personalDetails.fullName",
            "employeeInformation.employeeId",
          ],
          maxDepth: 1,
        },
      },
      employeeStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmployeeStatus",
        default: null,
        autopopulate: true,
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
  }
);

employeeSchema.plugin(autopopulate);

employeeSchema.post("save", async function (doc) {
  await createLeaveProfile(doc);
});

employeeSchema.statics.build = (attrs: EmployeeAttrs) => {
  return new Employee(attrs);
};

const Employee = mongoose.model<EmployeeDoc, EmployeeModel>(
  "Employee",
  employeeSchema
);

export { Employee };
