import { employmentTypeDoc } from "./employment-type";
import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

interface CategoryAttrs {
  name: string;
  shortForm: string;
  section: string;
  allottedDays: number;
  minAvail: number;
  maxAvail: number;
  eligibleEmploymentType: employmentTypeDoc;
  carryForward: boolean;
  minService: number;
  preapproval: boolean;
  maxAccumulation: number;
  payable: boolean;
  adjustment: CategoryDoc;
  prefix: boolean;
  suffix: boolean;
  intervention: boolean;
}

export interface CategoryDoc extends mongoose.Document {
  name: string;
  shortForm: string;
  section: string;
  allottedDays: number;
  minAvail: number;
  maxAvail: number;
  eligibleEmploymentType: employmentTypeDoc;
  carryForward: boolean;
  minService: number;
  preapproval: boolean;
  maxAccumulation: number;
  payable: boolean;
  adjustment: string;
  prefix: boolean;
  suffix: boolean;
  intervention: boolean;
}

interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortForm: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    section: {
      type: String,
      trim: true,
      default: null,
    },
    allottedDays: {
      type: Number,
      default: 0,
    },
    minAvail: {
      type: Number,
      default: 0.5,
    },
    maxAvail: {
      type: Number,
      default: null,
    },
    eligibleEmploymentType: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmploymentType",
        autopopulate: true,
      },
    ],
    carryForward: {
      type: Boolean,
      default: false,
    },
    minService: {
      type: Number,
      default: null,
    },
    preapproval: {
      type: Boolean,
      default: true,
    },
    maxAccumulation: {
      type: Number,
      default: null,
    },
    payable: {
      type: Boolean,
      default: false,
    },
    adjustment: {
      type: String,
      trim: true,
      default: null,
    },
    prefix: {
      type: Boolean,
      default: false,
    },
    suffix: { type: Boolean, default: false },
    intervention: {
      type: Boolean,
      default: true,
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

categorySchema.plugin(autopopulate);

categorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "Category",
  categorySchema
);

export { Category };
