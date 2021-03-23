import { Category } from "../../models/category";
import { LeaveProfile } from "../../models/leave-profile";
import mongoose from "mongoose";

export const createLeaveProfile = async (doc: mongoose.Document) => {
  const leaveProfileDoc = [];
  for await (const category of await Category.find()) {
    const singleLeaveProfile = LeaveProfile.build({
      category: category.id,
      remainingLeave: category.allottedDays,
      employee: doc._id,
    });
    leaveProfileDoc.push(singleLeaveProfile);
  }
  if (leaveProfileDoc) {
    await LeaveProfile.insertMany(leaveProfileDoc);
  }
};
