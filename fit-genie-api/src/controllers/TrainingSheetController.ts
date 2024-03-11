import { Request, Response } from "express";
import { TrainingSheetService } from "../services/TrainingSheetService";

class TrainingSheetController {
    async createOrder(req: Request, res: Response) {
        const { user_id, name } = req.body;

        const trainingSheetService = new TrainingSheetService();

        const trainingSheet = await trainingSheetService.createTrainingSheet({ user_id, name });
        
        return res.json(trainingSheet);
    }

    async removeTrainingSheet(req: Request, res: Response) {
        const training_sheet_id = req.params.training_sheet_id;

        const trainingSheetService = new TrainingSheetService();

        const trainingSheet = await trainingSheetService.removeTrainingSheet({ training_sheet_id: Number(training_sheet_id) });
        
        return res.json(trainingSheet);
    }

    async getTrainingSheetDetails(req: Request, res: Response) {
        const training_sheet_id = req.params.training_sheet_id;

        const trainingSheetService = new TrainingSheetService();

        const trainingSheetDetails = await trainingSheetService.getTrainingSheetsDetails({ training_sheet_id: Number(training_sheet_id) });
    
        return res.json(trainingSheetDetails);
    }

    async getTrainingSheetsByUser(req: Request, res: Response) {
        const user_id = req.params.user_id;

        const trainingSheetService = new TrainingSheetService();

        const trainingSheets = await trainingSheetService.getTrainingSheets({ user_id: Number(user_id) });
    
        return res.json(trainingSheets);
    }

    async updateTrainingSheet(req: Request, res: Response) {
        const { training_sheet_id, name } = req.body;

        const trainingSheetService = new TrainingSheetService();

        const trainingSheets = await trainingSheetService.updateTrainingSheet({ training_sheet_id: Number(training_sheet_id), name });
    
        return res.json(trainingSheets);
    }

}

export { TrainingSheetController }