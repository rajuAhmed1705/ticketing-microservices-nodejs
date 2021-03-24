import mongoose from "mongoose";
import { EmployeeDoc } from "./employee";

interface SkillAttrs {
  functionalCompetency: string;
  language: string;
  computerSkill: [string];
  softCompetency: [string];
  employee: EmployeeDoc;
}

interface SkillDoc extends mongoose.Document {
  functionalCompetency: string;
  language: string;
  computerSkill: [string];
  softCompetency: [string];
  employee: EmployeeDoc;
}

interface SkillModel extends mongoose.Model<SkillDoc> {
  build(attrs: SkillAttrs): SkillDoc;
}

const skillSchema = new mongoose.Schema(
  {
    functionalCompetency: {
      type: String,
      trim: true,
      required: true,
    },
    language: {
      type: String,
      trim: true,
      default: null,
    },
    computerSkill: {
      type: [String],
      trim: true,
    },
    softCompetency: {
      type: [String],
      trim: true,
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

skillSchema.statics.build = (attrs: SkillAttrs) => {
  return new Skill(attrs);
};

const Skill = mongoose.model<SkillDoc, SkillModel>("Skill", skillSchema);

export { Skill };
