import mongoose from "mongoose";

interface SalaryGradeAttrs {
  grade: string;
  minimumSalary: number;
  maximumSalary: number;
  remark: string;
}

export interface SalaryGradeDoc extends mongoose.Document {
  grade: string;
  minimumSalary: number;
  maximumSalary: number;
  remark: string;
}

interface SalaryGradeModel extends mongoose.Model<SalaryGradeDoc> {
  build(attrs: SalaryGradeAttrs): SalaryGradeDoc;
}

const salaryGradeSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    minimumSalary: {
      type: Number,
      required: true,
      min: 5000,
      max: 1000000,
    },
    maximumSalary: {
      type: Number,
      required: true,
      min: 5000,
      max: 1000000,
    },
    remark: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

salaryGradeSchema.statics.build = (attrs: SalaryGradeAttrs) => {
  return new SalaryGrade(attrs);
};

const SalaryGrade = mongoose.model<SalaryGradeDoc, SalaryGradeModel>(
  "SalaryGrade",
  salaryGradeSchema
);

export { SalaryGrade };
