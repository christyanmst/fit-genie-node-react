import { TrainingSheetRepository } from "../repository/TrainingSheetRepository";
import { TrainingSheetItemsService } from "./TrainingSheetItemService";

interface CreateTrainingSheet {
    user_id: number;
    name: string;
}

interface HandleTrainingSheet {
    training_sheet_id: number;
    name?: string;
}

interface GetTrainingSheets {
    user_id: number;
}

const trainingSheetRepository = new TrainingSheetRepository();
const trainingSheetItemService = new TrainingSheetItemsService();

class TrainingSheetService {
    async createTrainingSheet({ user_id, name }: CreateTrainingSheet) {
        if (!(user_id && name)) throw new Error('Missing parameters');

        const trainingSheet = await trainingSheetRepository.createTrainingSheet({ user_id, name });

        return trainingSheet;
    }

    async removeTrainingSheet({ training_sheet_id }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');


        trainingSheetItemService.removeByTrainingSheetId({ training_sheet_id });

        const trainingSheet = await trainingSheetRepository.removeTrainingSheet({ training_sheet_id });

        return trainingSheet;
    }

    async getTrainingSheets({ user_id }: GetTrainingSheets ) {
        if (!user_id) throw new Error('Missing parameters');

        const trainingSheets = await trainingSheetRepository.getTrainingSheet({ user_id });

        return trainingSheets;
    }

    async getTrainingSheetsDetails({ training_sheet_id }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');
        
        const trainingSheetItemsDetails = await trainingSheetItemService.getTraininingSheetItemsDetails({ training_sheet_id });

        return trainingSheetItemsDetails;
    }

    async updateTrainingSheet({ training_sheet_id, name }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');

        const trainingSheet = await trainingSheetRepository.updateTrainingSheet({ training_sheet_id, name });

        return trainingSheet;
    }
}

export { TrainingSheetService }; 