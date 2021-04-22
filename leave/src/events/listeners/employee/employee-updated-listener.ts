import { EmployeeUpdatedEvent, Listener, Subjects } from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { Employee } from "../../../models/employee";
import { queueGroupName } from "../queue-group-name";

export class EmployeeUpdatedListener extends Listener<EmployeeUpdatedEvent> {
  subject: Subjects.EmployeeUpdated = Subjects.EmployeeUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: EmployeeUpdatedEvent["data"], msg: Message) {
    const employee = await Employee.findByEvent(data);

    if (!employee) {
      throw new Error("employee not found");
    }

    const {
      personalDetails: { fullName, religion },
      employeeInformation: {
        employeeId,
        department,
        designation,
        dateOfJoin,
        employeeStatus,
        employmentType,
        reportingTo,
      },
    } = data;

    employee.set({
      personalDetails: {
        fullName,
        religion,
      },
      employeeInformation: {
        employeeId,
        employeeStatus,
        employmentType,
        reportingTo,
        department,
        designation,
        dateOfJoin,
      },
    });

    await employee.save();

    console.log(employee);

    msg.ack();
  }
}
