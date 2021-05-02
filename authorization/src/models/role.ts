import mongoose, { Model, Document, Schema } from "mongoose";

interface RoleAttrs {
  name: string;
  remark?: string;
  createdBy?: string;
}

export interface RoleDoc extends Document {
  name: string;
  remark: string;
  createdBy: string;
}

interface RoleModel extends Model<RoleDoc> {
  build(attrs: RoleAttrs): RoleDoc;
}

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    remark: {
      type: String,
      trim: true,
      default: null,
    },
    createdBy: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

roleSchema.statics.build = (attrs: RoleAttrs) => {
  return new Role(attrs);
};

const Role = mongoose.model<RoleDoc, RoleModel>("Role", roleSchema);

export { Role };
