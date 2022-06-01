import { Request, Response } from "express";
import dvdService from "../services/dvd.service";

class DvdController {
  createDvd = async (req: Request, res: Response) => {
    const newDvds = await dvdService.createDvd(req);

    res.status(200).json({ dvds: newDvds });
  };

  getAllDvds = async (_: Request, res: Response) => {
    const allDvds = await dvdService.getAllDvds();

    res.status(200).json([...allDvds]);
  };
}

export default new DvdController();
