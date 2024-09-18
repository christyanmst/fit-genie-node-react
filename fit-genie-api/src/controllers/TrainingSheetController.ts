import { Request, Response } from "express";
import { appFacade } from "../facade/AppFacade"; // Import the facade

class TrainingSheetController {
    async createOrder(req: Request, res: Response) {
        const { user_id, name } = req.body;

        try {
            const trainingSheet = await appFacade.createTrainingSheet(user_id, name);
            return res.json(trainingSheet);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async removeTrainingSheet(req: Request, res: Response) {
        const training_sheet_id = req.params.training_sheet_id;

        try {
            const trainingSheet = await appFacade.removeTrainingSheet(Number(training_sheet_id));
            return res.json(trainingSheet);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getTrainingSheetDetails(req: Request, res: Response) {
        const training_sheet_id = req.params.training_sheet_id;

        try {
            const trainingSheetDetails = await appFacade.getTrainingSheetDetails(Number(training_sheet_id));
            return res.json(trainingSheetDetails);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getTrainingSheetsByUser(req: Request, res: Response) {
        const user_id = req.params.user_id;

        try {
            const trainingSheets = await appFacade.getTrainingSheetsByUser(Number(user_id));
            return res.json(trainingSheets);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateTrainingSheet(req: Request, res: Response) {
        const { training_sheet_id, name } = req.body;

        try {
            const trainingSheets = await appFacade.updateTrainingSheet(Number(training_sheet_id), name);
            return res.json(trainingSheets);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { TrainingSheetController };
