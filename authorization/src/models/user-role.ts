import mongoose from "mongoose";
import { RoleDoc } from "./role";
import { UserDoc } from "./user";

interface UserRoleAttrs {
  user: UserDoc;
  role: RoleDoc;
  remark?: string;
}

interface UserRoleDoc extends mongoose.Document {
  user: UserDoc;
  role: RoleDoc;
  remark: string;
}

interface UserRoleModel extends mongoose.Model<UserRoleDoc> {
  build(attrs: UserRoleAttrs): UserRoleDoc;
}

const userRoleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});
