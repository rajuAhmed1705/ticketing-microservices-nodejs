import mongoose from "mongoose";
import { EmployeeDoc } from "./employee";

interface WorkAttrs {
  companyName: string;
  designation: string;
  department: string;
  duration: {
    start: Date;
    end: Date;
  };
  supervisor: {
    name: string;
    contact: string;
  };
  employee: EmployeeDoc;
}

export interface WorkDoc extends mongoose.Document {
  companyName: string;
  designation: string;
  department: string;
  duration: {
    start: Date;
    end: Date;
  };
  supervisor: {
    name: string;
    contact: string;
  };
  employee: EmployeeDoc;
}

interface WorkModel extends mongoose.Model<WorkDoc> {
  build(attrs: WorkAttrs): WorkDoc;
}

const workSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    designation: {
      type: String,
      trim: true,
      default: null,
    },
    department: {
      type: String,
      trim: true,
      default: null,
    },
    duration: {
      start: { type: Date, default: null },
      end: { type: Date, default: null },
    },
    supervisor: {
      name: {
        type: String,
        trim: true,
        default: null,
      },
      contact: {
        type: String,
        trim: true,
        default: null,
      },
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

workSchema.statics.build = (attrs: WorkAttrs) => {
  return new Work(attrs);
};

const Work = mongoose.model<WorkDoc, WorkModel>("Work", workSchema);

export { Work };
