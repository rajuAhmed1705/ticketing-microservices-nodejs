import mongoose from "mongoose";
import { EmployeeDoc } from "./employee";

interface EducationAttrs {
  professionalQualification: string;
  degree: string;
  faculty: string;
  institution: string;
  major: string;
  passingYear: string;
  cgpa: string;
  employee: EmployeeDoc;
}

export interface EducationDoc extends mongoose.Document {
  professionalQualification: string;
  degree: string;
  faculty: string;
  institution: string;
  major: string;
  passingYear: string;
  cgpa: string;
  employee: EmployeeDoc;
}

interface EducationModel extends mongoose.Model<EducationDoc> {
  build(attrs: EducationAttrs): EducationDoc;
}

const educationSchema = new mongoose.Schema(
  {
    professionalQualification: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      trim: true,
      default: null,
    },
    faculty: {
      type: String,
      trim: true,
      default: null,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    major: {
      type: String,
      trim: true,
      default: null,
    },
    passingYear: {
      type: String,
      trim: true,
      default: null,
    },
    cgpa: {
      type: String,
      trim: true,
      default: null,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
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

educationSchema.statics.build = (attrs: EducationAttrs) => {
  return new Education(attrs);
};

const Education = mongoose.model<EducationDoc, EducationModel>(
  "Education",
  educationSchema
);

export { Education };
