import mongoose from "mongoose";
import { DepartmentDoc } from "./department";
import { DesignationDoc } from "./designation";
import { employmentTypeDoc } from "./employment-type";
import { locationDoc } from "./job-location";
import { ProjectDoc } from "./project";
import { TeamDoc } from "./team";
import { ReligionDoc } from "./religion";
import { TurnoverDoc } from "./turnover";
import { SalaryGradeDoc } from "./salary-grade";
import { SeparationDoc } from "./separation";
import { EmployeeStatusDoc } from "./employee-status";
import { ConfirmationRuleDoc } from "./confirmation-rule";
import autopopulate from "mongoose-autopopulate";

interface EmployeeAttrs {
  personalDetails: {
    fullName: string;
    preferredNickName?: string;
    fathersName?: string;
    fathersProfession?: string;
    mothersName?: string;
    mothersProfession?: string;
    maritalStatus?: string;
    spouseName?: string;
    dateOfBirth?: Date;
    numberOfDependents?: number;
    nationalID?: string;
    passport?: string;
    birthCertificate?: string;
    gender?: string;
    religion?: ReligionDoc;
    nationality?: string;
    emergencyContact?: string;
    bloodGroup?: string;
    personalNumber?: string;
    personalEmail?: string;
  };
  employeeInformation: {
    employeeId: string;
    department?: DepartmentDoc;
    designation?: DesignationDoc;
    team?: TeamDoc;
    employmentType?: employmentTypeDoc;
    project?: ProjectDoc[];
    dateOfJoin: Date;
    reportingTo?: EmployeeDoc;
    jobLocation?: locationDoc;
    turnover?: TurnoverDoc;
    salaryGrade?: SalaryGradeDoc;
    separation?: SeparationDoc;
    employeeStatus?: EmployeeStatusDoc;
    confirmationRule?: ConfirmationRuleDoc;
  };
}

export interface EmployeeDoc extends mongoose.Document {
  personalDetails: {
    fullName: string;
    preferredNickName: string;
    fathersName: string;
    fathersProfession: string;
    mothersName: string;
    mothersProfession: string;
    matitalStatus: string;
    spouseName: string;
    dateOfBirth: Date;
    numberOfDependents: number;
  };
  employeeInformation: {
    employeeId: string;
    department?: DepartmentDoc;
    designation?: DesignationDoc;
    team?: TeamDoc;
    employmentType?: employmentTypeDoc;
    project?: ProjectDoc;
    dateOfJoin: Date;
    reportingTo?: EmployeeDoc;
    jobLocation?: locationDoc;
    turnover?: TurnoverDoc;
    salaryGrade?: SalaryGradeDoc;
    separation?: SeparationDoc;
    employeeStatus?: EmployeeStatusDoc;
    confirmationRule?: ConfirmationRuleDoc;
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
      preferredNickName: {
        type: String,
        trim: true,
        default: null,
      },
      fathersName: {
        type: String,
        trim: true,
        default: null,
      },
      fathersProfession: {
        type: String,
        trim: true,
        default: null,
      },
      mothersName: {
        type: String,
        trim: true,
        default: null,
      },
      mothersProfession: {
        type: String,
        trim: true,
        default: null,
      },
      maritalStatus: {
        type: String,
        trim: true,
        default: null,
      },
      spouseName: {
        type: String,
        trim: true,
        default: null,
      },
      dateOfBirth: {
        type: Date,
        default: null,
      },
      numberOfDependents: {
        type: Number,
        trim: true,
        default: null,
      },
      nationalID: {
        type: String,
        trim: true,
        default: null,
      },
      passport: {
        type: String,
        trim: true,
        default: null,
      },
      birthCertificate: {
        type: String,
        trim: true,
        default: null,
      },
      gender: {
        type: String,
        trim: true,
        default: null,
      },
      religion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Religion",
        default: null,
        autopopulate: true,
      },
      nationality: {
        type: String,
        trim: true,
        default: null,
      },
      emergencyContact: {
        type: String,
        trim: true,
        default: null,
      },
      bloodGroup: {
        type: String,
        trim: true,
        default: null,
      },
      personalNumber: {
        type: String,
        trim: true,
        default: null,
      },
      personalEmail: {
        type: String,
        trim: true,
        default: null,
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

<<<<<<< HEAD
      designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation",
        default: null,
        autopopulate: true,
      },
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null,
        autopopulate: true,
      },
      employmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmploymentType",
        default: null,
        autopopulate: true,
      },
      project: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
          autopopulate: true,
=======
            designation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Designation",
                default: null,
                autopopulate: true,
            },
            team: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Team",
                default: null,
                autopopulate: true,
            },
            employmentType: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "EmploymentType",
                default: null,
                autopopulate: true,
            },
            project: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Project",
                    autopopulate: true,
                },
            ],
            dateOfJoin: {
                type: Date,
                default: null
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
            jobLocation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "JobLocation",
                default: null,
                autopopulate: true,
            },
            turnover: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Turnover",
                default: null,
                autopopulate: true,
            },
            salaryGrade: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SalaryGrade",
                default: null,
                autopopulate: true,
            },
            separation: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Separation",
                default: null,
                autopopulate: true,
            },
            employeeStatus: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "EmployeeStatus",
                default: null,
                autopopulate: true,
            },
            confirmationRule: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ConfirmationRule",
                default: null,
                autopopulate: true,
            },
>>>>>>> client1.0.1
        },
      ],
      dateOfJoin: {
        type: Date,
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
      jobLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobLocation",
        default: null,
        autopopulate: true,
      },
      turnover: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Turnover",
        default: null,
        autopopulate: true,
      },
      salaryGrade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalaryGrade",
        default: null,
        autopopulate: true,
      },
      separation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Separation",
        default: null,
        autopopulate: true,
      },
      employeeStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmployeeStatus",
        default: null,
        autopopulate: true,
      },
      confirmationRule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConfirmationRule",
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
    timestamps: true,
  }
);

employeeSchema.virtual("workExperiences", {
  ref: "Work",
  localField: "_id",
  foreignField: "employee",
});

employeeSchema.virtual("skills", {
  ref: "Skill",
  localField: "_id",
  foreignField: "employee",
});

employeeSchema.virtual("educations", {
  ref: "Education",
  localField: "_id",
  foreignField: "employee",
});

employeeSchema.virtual("trainings", {
  ref: "Training",
  localField: "_id",
  foreignField: "employee",
});

employeeSchema.virtual("bankDetails", {
  ref: "BankDetails",
  localField: "_id",
  foreignField: "employee",
});

employeeSchema.virtual("addresses", {
  ref: "Address",
  localField: "_id",
  foreignField: "employee",
});

employeeSchema.plugin(autopopulate);

employeeSchema.statics.build = (attrs: EmployeeAttrs) => {
  return new Employee(attrs);
};

const Employee = mongoose.model<EmployeeDoc, EmployeeModel>(
  "Employee",
  employeeSchema
);

export { Employee };
