import { Document, Model, model, Schema } from "mongoose";

interface CompanyAttrs {
  name: string;
  location: string;
  companyType: string;
  subsidy: string;
  logo: string;
}

export interface CompanyDoc extends Document {
  name: string;
  location: string;
  companyType: string;
  subsidy: string;
  logo: string;
}

interface CompanyModel extends Model<CompanyDoc> {
  build(attrs: CompanyAttrs): CompanyDoc;
}

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    companyType: {
      type: String,
      default: null,
    },
    subsidy: [
      {
        type: String,
        trim: true,
        default: null,
      },
    ],
    logo: {
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
    timestamps: true,
  }
);

companySchema.statics.build = (attrs: CompanyAttrs) => {
  return new Company(attrs);
};

const Company = model<CompanyDoc, CompanyModel>("Company", companySchema);

export { Company };
