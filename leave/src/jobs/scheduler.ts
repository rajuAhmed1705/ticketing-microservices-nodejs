import schedude from "node-schedule";
import { LeaveTimeline } from "../models/leave-timeline";

class Scheduler {
  constructor() {
    this.leaveBalanceJob();
  }

  leaveBalanceJob = async () => {
    schedude.scheduleJob("30 11 * * *", async () => {
      const todaysLeave = await LeaveTimeline.find();
    });
  };
}

export default new Scheduler();
