import { mediator } from "../mediator/AppMediator";

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

class TrainingSheetService {
    async createTrainingSheet({ user_id, name }: CreateTrainingSheet) {
        if (!(user_id && name)) throw new Error('Missing parameters');

        const trainingSheet = await mediator.publish('trainingSheet:create', { user_id, name });

        return trainingSheet;
    }

    async removeTrainingSheet({ training_sheet_id }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');

        await mediator.publish('trainingSheetItem:removeByTrainingSheetId', { training_sheet_id });

        const trainingSheet = await mediator.publish('trainingSheet:remove', { training_sheet_id });

        return trainingSheet;
    }

    async getTrainingSheets({ user_id }: GetTrainingSheets) {
        if (!user_id) throw new Error('Missing parameters');

        const trainingSheets = await mediator.publish('trainingSheet:get', { user_id });

        return trainingSheets;
    }

    async getTrainingSheetsDetails({ training_sheet_id }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');
        
        const trainingSheetItemsDetails = await mediator.publish('trainingSheetItem:getById', { training_sheet_id });

        return trainingSheetItemsDetails;
    }

    async updateTrainingSheet({ training_sheet_id, name }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');

        const trainingSheet = await mediator.publish('trainingSheet:update', { training_sheet_id, name });

        return trainingSheet;
    }
}

export { TrainingSheetService };
