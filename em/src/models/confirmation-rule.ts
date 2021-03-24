import mongoose from "mongoose";

interface ConfirmationRuleAttrs {
  ruleName: string;
}

export interface ConfirmationRuleDoc extends mongoose.Document {
  ruleName: string;
}

interface ConfirmationRuleModel extends mongoose.Model<ConfirmationRuleDoc> {
  build(attrs: ConfirmationRuleAttrs): ConfirmationRuleDoc;
}

const confirmationRuleSchema = new mongoose.Schema(
  {
    ruleName: {
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

confirmationRuleSchema.statics.build = (attrs: ConfirmationRuleAttrs) => {
  return new ConfirmationRule(attrs);
};

const ConfirmationRule = mongoose.model<
  ConfirmationRuleDoc,
  ConfirmationRuleModel
>("ConfirmationRule", confirmationRuleSchema);

export { ConfirmationRule };
