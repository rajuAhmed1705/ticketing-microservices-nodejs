import mongoose from "mongoose";
import { EmployeeDoc } from "./employee";

interface BankDetailsAttrs {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    address: string;
    accountType: string;
    purposeOfUse: string;
    employee: EmployeeDoc;
}

interface BankDetailsDoc extends mongoose.Document {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    address: string;
    accountType: string;
    purposeOfUse: string;
    employee: EmployeeDoc;
}

interface BankDetailsModel extends mongoose.Model<BankDetailsDoc> {
    build(attrs: BankDetailsAttrs): BankDetailsDoc;
}

const bankDetailsSchema = new mongoose.Schema(
    {
        accountName: {
            type: String,
            trim: true,
            required: true,
        },
        accountNumber: {
            type: String,
            trim: true,
            required: true,
        },
        bankName: {
            type: String,
            trim: true,
            required: true,
        },
        branchName: {
            type: String,
            trim: true,
            default: null,
        },
        address: {
            type: String,
            trim: true,
            default: null,
        },
        accountType: {
            type: String,
            trim: true,
            default: null,
        },
        purposeOfUse: {
            type: String,
            trim: true,
            default: null,
        },
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
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

bankDetailsSchema.statics.build = (attrs: BankDetailsAttrs) => {
    return new BankDetails(attrs);
};

const BankDetails = mongoose.model<BankDetailsDoc, BankDetailsModel>(
    "BankDetails",
    bankDetailsSchema
);

export { BankDetails };
