import mongoose from "mongoose";

interface UserAttrs {
  id: string;
  name: string;
  email: string;
  employeeId: string;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  employeeId: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    employeeId: String,
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

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
