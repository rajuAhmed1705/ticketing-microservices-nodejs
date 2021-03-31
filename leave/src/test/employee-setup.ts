import { Department } from "../models/department";
import { Designation } from "../models/designation";
import { Employee } from "../models/employee";
import { EmployeeStatus } from "../models/employee-status";
import { Religion } from "../models/religion";
import { employmentTypeSetup } from "./employment-type-setup";

export const employeeSetup = async () => {
  //new religion
  const religion = Religion.build({
    name: "islam",
  });
  await religion.save();

  //new department
  const department = Department.build({
    title: "IT",
    code: 2,
    remark: "information and technology",
  });
  await department.save();

  //new designation
  const designation = Designation.build({
    title: "software engineer",
    level: 4,
    remark: "do software development",
  });
  await designation.save();

  //new employee type
  const employmentType = await employmentTypeSetup();
  // const employmentType = EmploymentType.build({
  //   name: "permanent",
  // });
  // await employmentType.save();

  //new employee status
  const employeeStatus = EmployeeStatus.build({
    status: "active",
  });
  await employeeStatus.save();

  //new employee for reportingTo
  const employeeForReportingTo = Employee.build({
    personalDetails: {
      fullName: "raju ahmed",
      religion: religion.id,
    },
    employeeInformation: {
      employeeId: "11",
      companyId: "shurjoMukhi Ltd",
      department: department.id,
      designation: designation.id,
      dateOfJoin: new Date(),
      employmentType: employmentType.id,
      employeeStatus: employeeStatus.id,
    },
  });
  await employeeForReportingTo.save();

  //new employee
  const employee = Employee.build({
    personalDetails: {
      fullName: "Mr.X",
      religion: religion.id,
    },
    employeeInformation: {
      employeeId: "12",
      companyId: "shurjoMukhi Ltd",
      department: department.id,
      designation: designation.id,
      dateOfJoin: new Date(),
      employmentType: employmentType.id,
      reportingTo: employeeForReportingTo.id,
      employeeStatus: employeeStatus.id,
    },
  });
  await employee.save();

  const employeeinfo = await Employee.findById(employee.id);

  return { employeeinfo, employeeForReportingTo };
};
