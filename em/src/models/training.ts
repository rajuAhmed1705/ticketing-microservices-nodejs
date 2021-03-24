import mongoose from "mongoose";
import { EmployeeDoc } from "./employee";

interface TrainingAttrs {
  title: string;
  duration: string;
  learning: [string];
  institution: string;
  employee: EmployeeDoc;
}

export interface TrainingDoc extends mongoose.Document {
  title: string;
  duration: string;
  learning: [string];
  institution: string;
  employee: EmployeeDoc;
}

interface TrainingModel extends mongoose.Model<TrainingDoc> {
  build(attrs: TrainingAttrs): TrainingDoc;
}

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    duration: {
      type: String,
      trim: true,
      default: null,
    },
    learning: [String],
    institution: {
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

trainingSchema.statics.build = (attrs: TrainingAttrs) => {
  return new Training(attrs);
};

const Training = mongoose.model<TrainingDoc, TrainingModel>(
  "Training",
  trainingSchema
);

export { Training };
