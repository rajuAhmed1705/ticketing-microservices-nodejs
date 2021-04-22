import mongoose from "mongoose";
import { DepartmentDoc } from "./department";
import { DesignationDoc } from "./designation";
import { EmployeeStatusDoc } from "./employee-status";
import { employmentTypeDoc } from "./employment-type";
import { ReligionDoc } from "./religion";
import autopopulate from "mongoose-autopopulate";
import { createLeaveProfile } from "../middleware/DB/leave-profile";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import EventAttrs from "../events/event-attrs";

interface EmployeeAttrs {
  id: string;
  personalDetails: {
    fullName: string;
    religion?: string;
  };
  employeeInformation: {
    employeeId: string;
    // companyId: string;
    dateOfJoin: Date;
    department?: string;
    designation?: string;
    employmentType?: string;
    reportingTo?: string;
    employeeStatus?: string;
  };
}

export interface EmployeeDoc extends mongoose.Document {
  personalDetails: {
    fullName: string;
    religion: ReligionDoc;
  };
  employeeInformation: {
    employeeId: string;
    // companyId: string;
    dateOfJoin: Date;
    department: DepartmentDoc;
    designation: DesignationDoc;
    employmentType: employmentTypeDoc;
    reportingTo: EmployeeDoc;
    employeeStatus: EmployeeStatusDoc;
  };
  version: number;
}

interface EmployeeModel extends mongoose.Model<EmployeeDoc> {
  build(attrs: EmployeeAttrs): EmployeeDoc;
  findByEvent(event: EventAttrs): Promise<EmployeeDoc | null>;
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
      dateOfJoin: {
        type: Date,
        required: true,
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

employeeSchema.set("versionKey", "version");

employeeSchema.plugin(autopopulate);
employeeSchema.plugin(updateIfCurrentPlugin);

employeeSchema.post("save", async function (doc) {
  await createLeaveProfile(doc);
});

employeeSchema.statics.build = (attrs: EmployeeAttrs) => {
  return new Employee({
    _id: attrs.id,
    personalDetails: {
      fullName: attrs.personalDetails.fullName,
      religion: attrs.personalDetails.religion,
    },
    employeeInformation: {
      employeeId: attrs.employeeInformation.employeeId,
      dateOfJoin: attrs.employeeInformation.dateOfJoin,
      department: attrs.employeeInformation.department,
      designation: attrs.employeeInformation.designation,
      employmentType: attrs.employeeInformation.employmentType,
      reportingTo: attrs.employeeInformation.reportingTo,
      employeeStatus: attrs.employeeInformation.employeeStatus,
    },
  });
};
employeeSchema.statics.findByEvent = (event: EventAttrs) => {
  return Employee.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

const Employee = mongoose.model<EmployeeDoc, EmployeeModel>(
  "Employee",
  employeeSchema
);

export { Employee };
