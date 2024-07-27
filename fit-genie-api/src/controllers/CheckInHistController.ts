import { Request, Response } from "express";
import { CheckInHistService } from "../services/CheckInHistService";

const checkInHistService = new CheckInHistService();


class CheckInHistController {
    async createCheckIn(req: Request, res: Response) {
        const { userId } = req.body;

        const checkIn = await checkInHistService.createCheckIn({ userId });

        return res.json({ checkIn });
    }

    async getCheckInHist(req: Request, res: Response) {
        const userId = req.params.userId;

        const checkInHist = await checkInHistService.getCheckInHist({ userId: Number(userId) });

        return res.json({ checkInHist });
    }

    async verifyCheckInToday(req: Request, res: Response) {
        const userId = req.params.userId;

        const checkInToday = await checkInHistService.verifyCheckInToday({ userId: Number(userId) });

        return res.json({ checkInToday });
    }
}

export { CheckInHistController }
