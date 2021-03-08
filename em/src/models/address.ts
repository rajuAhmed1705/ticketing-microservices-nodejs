import mongoose from "mongoose";
import { EmployeeDoc } from "./employee";

interface AddressAttrs {
    addressType: ["permanent", "present", "emergency"];
    contact?: string;
    street: string;
    thana: string;
    district: string;
    division: string;
    employee: EmployeeDoc;
}

interface AddressDoc extends mongoose.Document {
    addressType: string;
    contact?: string;
    street: string;
    thana: string;
    district: string;
    division: string;
    employee: EmployeeDoc;
}

interface AddressModel extends mongoose.Model<AddressDoc> {
    build(attrs: AddressAttrs): AddressDoc;
}

const AddressSchema = new mongoose.Schema(
    {
        addressType: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            trim: true,
            default: null,
        },
        street: {
            type: String,
            trim: true,
            default: null,
        },
        thana: {
            type: String,
            default: null,
        },
        district: {
            type: String,
            default: null,
        },
        division: {
            type: String,
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

AddressSchema.statics.build = (attrs: AddressAttrs) => {
    return new Address(attrs);
};

const Address = mongoose.model<AddressDoc, AddressModel>(
    "Address",
    AddressSchema
);

export { Address };
