import schedule from "node-schedule";
import { leaveAdjustment } from "../services/leave-adjustment";

class Scheduler {
  constructor() {
    this.leaveBalanceJob();
  }

  leaveBalanceJob = async () => {
    console.log("do some leave adjustment");
    schedule.scheduleJob("2 * * * * *", async () => {
      await leaveAdjustment();
    });
  };
}

export default new Scheduler();
