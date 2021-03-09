import { Router, Request, Response } from "express";
import _ from "lodash";
import {
  allDivision,
  districtsOf,
  DivisonName,
  upazilasOf,
} from "@bangladeshi/bangladesh-address";

const router = Router();

router.get(
  "/api/employee-management/divisions",
  (req: Request, res: Response) => {
    const divisions = allDivision();

    res.status(200).send(divisions);
  }
);

router.get(
  "/api/employee-management/districts/:division",
  (req: Request, res: Response) => {
    let districts: unknown;

    if (_.upperFirst(req.params.division) in DivisonName) {
      //@ts-ignore
      districts = districtsOf(req.params.division);
    }

    res.status(200).send(districts);
  }
);

router.get(
  "/api/employee-management/upazila/:district",
  (req: Request, res: Response) => {
    let upazila: unknown;
    if (req.params.district) {
      upazila = upazilasOf(req.params.district);
    }

    res.status(200).send(upazila);
  }
);

export { router as bangladeshAddressInfoRouter };
