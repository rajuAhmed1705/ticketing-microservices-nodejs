import { EmployeeCreatedEvent, Listener, Subjects } from "@shurjomukhi/common";
import { Message } from "node-nats-streaming";
import { Employee } from "../../../models/employee";
import { queueGroupName } from "../queue-group-name";

export class EmployeeCreatedListener extends Listener<EmployeeCreatedEvent> {
  subject: Subjects.EmployeeCreated = Subjects.EmployeeCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: EmployeeCreatedEvent["data"], msg: Message) {
    const {
      id,
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

    const employee = Employee.build({
      id,
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
