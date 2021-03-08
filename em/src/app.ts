import express from "express";
import "express-async-errors";
import { json, urlencoded } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import { errorHandler, NotFoundError } from "@shurjomukhi/common";

//routes
import { employeeRouter } from "./routes/employee";
import { departmentRouter } from "./routes/department";
import { projectRouter } from "./routes/project";
import { teamRouter } from "./routes/team";
import { designationRouter } from "./routes/designation";
import { employmentTypeRouter } from "./routes/employment-type";
import { salaryGradeRouter } from "./routes/salary-grade";
import { jobLocationRouter } from "./routes/job-location";
import { separationRouter } from "./routes/separation";
import { educationRouter } from "./routes/education";
import { workRouter } from "./routes/work";
import { trainingRouter } from "./routes/training";
import { skillRouter } from "./routes/skill";
import { bankDetailsRouter } from "./routes/bank-details";
import { confirmationRuleRouter } from "./routes/confirmation-rule";
import { employeeStatusRouter } from "./routes/employee-status";
import { religionRouter } from "./routes/religion";
import { turnoverRouter } from "./routes/turnover";
import { universityRouter } from "./routes/university";
import { addressRouter } from "./routes/address";
import { bangladeshAddressInfoRouter } from "./routes/bangladesh-address-info";
import { companyRouter } from "./routes/company";

const app = express();
app.use(json());
app.use(cors());
app.use(
    urlencoded({
        extended: false,
    })
);
app.set("trust proxy", true);
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
    })
);

app.use(employeeRouter);
app.use(departmentRouter);
app.use(projectRouter);
app.use(teamRouter);
app.use(designationRouter);
app.use(employmentTypeRouter);
app.use(salaryGradeRouter);
app.use(jobLocationRouter);
app.use(separationRouter);
app.use(educationRouter);
app.use(workRouter);
app.use(trainingRouter);
app.use(skillRouter);
app.use(bankDetailsRouter);
app.use(confirmationRuleRouter);
app.use(employeeStatusRouter);
app.use(religionRouter);
app.use(turnoverRouter);
app.use(universityRouter);
app.use(addressRouter);
app.use(bangladeshAddressInfoRouter);
app.use(companyRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
