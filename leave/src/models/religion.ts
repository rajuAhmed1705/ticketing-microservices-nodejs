import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import EventAttrs from "../events/event-attrs";

interface ReligionAttrs {
  id: string;
  name: string;
}

export interface ReligionDoc extends mongoose.Document {
  name: string;
  version: number;
}

interface ReligionModel extends mongoose.Model<ReligionDoc> {
  build(attrs: ReligionAttrs): ReligionDoc;
  findByEvent(event: EventAttrs): Promise<ReligionDoc | null>;
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

religionSchema.statics.findByEvent = (event: EventAttrs) => {
  return Religion.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

religionSchema.statics.build = (attrs: ReligionAttrs) => {
  return new Religion({
    _id: attrs.id,
    name: attrs.name,
  });
};

const Religion = mongoose.model<ReligionDoc, ReligionModel>(
  "Religion",
  religionSchema
);

export { Religion };
