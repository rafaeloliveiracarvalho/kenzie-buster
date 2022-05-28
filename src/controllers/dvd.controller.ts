import { Request, Response } from "express";
import dvdService from "../services/dvd.service";

class DvdController {
  createDvd = async (req: Request, res: Response) => {
    const newDvd = await dvdService.createDvd(req);

    res.status(200).json(newDvd);
  };
}

export default new DvdController();
