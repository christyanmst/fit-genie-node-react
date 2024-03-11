import { Request, Response } from "express";
import { TrainingSheetItemsService } from "../services/TrainingSheetItemService";

class TrainingSheetItemController {
    async createTrainingSheetItems(req: Request, res: Response) {
        const { training_sheet_id, items } = req.body;

        const trainingSheetItemService = new TrainingSheetItemsService();

        const trainingSheetItems = await trainingSheetItemService.createTrainingSheetItems({ training_sheet_id, items });
        
        return res.json(trainingSheetItems);
    }

    async updateTrainingSheetItems(req: Request, res: Response) {
        const { items } = req.body;

        const trainingSheetItemService = new TrainingSheetItemsService();

        const trainingSheetItems = await trainingSheetItemService.updateTrainingSheetItems({ items });
        
        return res.json(trainingSheetItems);
    }

    async removeTrainingSheetItems(req: Request, res: Response) {
        const { training_sheet_item_ids } = req.body;

        const trainingSheetItemService = new TrainingSheetItemsService();

        const trainingSheetItems = await trainingSheetItemService.removeTrainingSheetItems({ training_sheet_item_ids });
        
        return res.json(trainingSheetItems);
    }
}

export { TrainingSheetItemController }