import { Request, Response } from "express";
import dvdService from "../services/dvd.service";

class DvdController {
  createDvd = async (req: Request, res: Response) => {
    const newDvds = await dvdService.createDvd(req);

    res.status(200).json({ dvds: newDvds });
  };
}

export default new DvdController();
