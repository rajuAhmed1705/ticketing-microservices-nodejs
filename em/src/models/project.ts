import mongoose from "mongoose";

interface ProjectAttrs {
  name: string;
  description: string;
  startingDate: Date;
  endDate: Date;
  remark: string;
}

export interface ProjectDoc extends mongoose.Document {
  name: string;
  description: string;
  startingDate: Date;
  endDate: Date;
  remark: string;
}

interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(attrs: ProjectAttrs): ProjectDoc;
}

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    startingDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
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

projectSchema.statics.build = (attrs: ProjectAttrs) => {
  return new Project(attrs);
};

const Project = mongoose.model<ProjectDoc, ProjectModel>(
  "Project",
  projectSchema
);

export { Project };
