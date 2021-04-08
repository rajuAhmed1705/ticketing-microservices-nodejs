import { Category } from "../../models/category";
import { LeaveProfile } from "../../models/leave-profile";
import mongoose from "mongoose";
import { calAllottedleave } from "../../services/cal-allotted-leave";
import { Employee } from "../../models/employee";

export const createLeaveProfile = async (doc: mongoose.Document) => {
  const leaveProfileDoc = [];
  for await (const category of await Category.find()) {
    const employee = await Employee.findById(doc._id);
    if (
      employee &&
      employee.employeeInformation.dateOfJoin &&
      category.yearly
    ) {
      const remainingLeave = calAllottedleave(
        employee.employeeInformation.dateOfJoin,
        category.allottedDays
      );

      const singleLeaveProfile = LeaveProfile.build({
        category: category.id,
        remainingLeave,
        employee: doc._id,
      });
      leaveProfileDoc.push(singleLeaveProfile);
    }
    if (employee && !category.yearly) {
      const singleLeaveProfile = LeaveProfile.build({
        category: category.id,
        remainingLeave: category.allottedDays,
        employee: doc._id,
      });
      leaveProfileDoc.push(singleLeaveProfile);
    }
  }
  if (leaveProfileDoc) {
    await LeaveProfile.insertMany(leaveProfileDoc);
  }
};
