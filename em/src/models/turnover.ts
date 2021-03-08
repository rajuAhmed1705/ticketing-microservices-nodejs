import mongoose from "mongoose";

interface TurnoverAttrs {
    name: string;
}

export interface TurnoverDoc extends mongoose.Document {
    name: string;
}

interface TurnoverModel extends mongoose.Model<TurnoverDoc> {
    build(attrs: TurnoverAttrs): TurnoverDoc;
}

const turnoverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
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

turnoverSchema.statics.build = (attrs: TurnoverAttrs) => {
    return new Turnover(attrs);
};

const Turnover = mongoose.model<TurnoverDoc, TurnoverModel>(
    "Turnover",
    turnoverSchema
);

export { Turnover };
