import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ReligionAttrs {
  name: string;
}

export interface ReligionDoc extends mongoose.Document {
  name: string;
  version: number;
}

interface ReligionModel extends mongoose.Model<ReligionDoc> {
  build(attrs: ReligionAttrs): ReligionDoc;
}

const religionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

religionSchema.set("versionKey", "version");

religionSchema.plugin(updateIfCurrentPlugin);

religionSchema.statics.build = (attrs: ReligionAttrs) => {
  return new Religion(attrs);
};

const Religion = mongoose.model<ReligionDoc, ReligionModel>(
  "Religion",
  religionSchema
);

export { Religion };
