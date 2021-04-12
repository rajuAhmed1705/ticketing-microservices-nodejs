import mongoose, { CollationOptions, Collection, Model } from "mongoose";

interface ConflictAttrs {
  modelName?: string;
  docId?: mongoose.Types.ObjectId;
  remarks?: string;
  status?: boolean;
}

export interface ConflictDoc extends mongoose.Document {
  modelName: string;
  docId: mongoose.Types.ObjectId;
  remarks: string;
  status: boolean;
}

interface ConflictModel extends mongoose.Model<ConflictDoc> {
  build(attrs: ConflictAttrs): ConflictDoc;
}

const conflictSchema = new mongoose.Schema({
  modelName: {
    type: String,
    default: null,
  },
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  remarks: {
    type: String,
    default: null,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

conflictSchema.statics.build = (attrs: ConflictAttrs) => {
  return new Conflict(attrs);
};

const Conflict = mongoose.model<ConflictDoc, ConflictModel>(
  "Conflict",
  conflictSchema
);

export { Conflict };
