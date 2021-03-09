import mongoose from "mongoose";

interface UniversityAttrs {
  name: string;
  location: string;
  type: string;
}

interface UniversityDoc extends mongoose.Document {
  name: string;
  location: string;
  type: string;
}

interface UniversityModel extends mongoose.Model<UniversityDoc> {
  build(attrs: UniversityAttrs): UniversityDoc;
}

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    location: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
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

universitySchema.statics.build = (attrs: UniversityAttrs) => {
  return new University(attrs);
};

const University = mongoose.model<UniversityDoc, UniversityModel>(
  "University",
  universitySchema
);

export { University };
