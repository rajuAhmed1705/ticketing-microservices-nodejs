import mongoose from "mongoose";
import { DepartmentDoc } from "./department";

interface TeamAttrs {
    name: string;
    remark: string;
    department: DepartmentDoc;
}

export interface TeamDoc extends mongoose.Document {
    name: string;
    remark: string;
    department: DepartmentDoc;
}

interface TeamModel extends mongoose.Model<TeamDoc> {
    build(attrs: TeamAttrs): TeamDoc;
}

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        remark: {
            type: String,
            default: null,
            trim: true,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
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

teamSchema.statics.build = (attrs: TeamAttrs) => {
    return new Team(attrs);
};

const Team = mongoose.model<TeamDoc, TeamModel>("Team", teamSchema);

export { Team };
