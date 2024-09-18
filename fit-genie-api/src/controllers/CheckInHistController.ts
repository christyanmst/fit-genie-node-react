import { Request, Response } from "express";
import { appFacade } from "../facade/AppFacade";



class CheckInHistController {
    async createCheckIn(req: Request, res: Response) {
        const { userId } = req.body;

        try {
            const checkIn = await appFacade.createCheckIn(userId);
            return res.json({ checkIn });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getCheckInHist(req: Request, res: Response) {
        const userId = req.params.userId;

        try {
            const checkInHist = await appFacade.getCheckInHistory(Number(userId));
            return res.json({ checkInHist });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async verifyCheckInToday(req: Request, res: Response) {
        const userId = req.params.userId;

        try {
            const checkInToday = await appFacade.verifyCheckInToday(Number(userId));
            return res.json({ checkInToday });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CheckInHistController }
