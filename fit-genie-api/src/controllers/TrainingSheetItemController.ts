import { Request, Response } from "express";
import { appFacade } from "../facade/AppFacade";

class TrainingSheetItemController {
    async createTrainingSheetItems(req: Request, res: Response) {
        const { training_sheet_id, items } = req.body;

        try {
            const trainingSheetItems = await appFacade.createTrainingSheetItems(training_sheet_id, items);
            return res.json(trainingSheetItems);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateTrainingSheetItems(req: Request, res: Response) {
        const { items } = req.body;

        try {
            const trainingSheetItems = await appFacade.updateTrainingSheetItems(items);
            return res.json(trainingSheetItems);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async removeTrainingSheetItems(req: Request, res: Response) {
        const { training_sheet_item_ids } = req.body;

        try {
            const trainingSheetItems = await appFacade.removeTrainingSheetItems(training_sheet_item_ids);
            return res.json(trainingSheetItems);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { TrainingSheetItemController };
