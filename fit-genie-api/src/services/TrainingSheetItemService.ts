import { TrainingSheetItemRepository } from "../repository/TrainingSheetItemRepository";

interface HandleTrainingSheetItems {
    training_sheet_id?: number,
    items: {
        id?: number;
        name: string,
        description: string,
        repetitions: number,
        series: number,
        link: string,
    }[]
}

interface RemoveTrainingSheetItems {
    training_sheet_item_ids: number[],
}

const trainingSheetItemRepository = new TrainingSheetItemRepository();
class TrainingSheetItemsService {
    async createTrainingSheetItems({ training_sheet_id, items }: HandleTrainingSheetItems) {
        if (!(training_sheet_id && items.length)) throw new Error('Missing parameters');

        for (const item of items) {
            await trainingSheetItemRepository.createTrainingSheetItem({ training_sheet_id, item });
        }

        return { ok: true };
    }

    async updateTrainingSheetItems({ items }: HandleTrainingSheetItems) {
        if (!items.length) throw new Error('Missing parameters');

        for (const item of items) {
            await trainingSheetItemRepository.updateTrainingSheetItem({ item });
        }

        return { ok: true };
    }

    async removeTrainingSheetItems({ training_sheet_item_ids }: RemoveTrainingSheetItems) {
        if (!training_sheet_item_ids.length) throw new Error('Missing parameters');

        const trainingSheetsItems = await trainingSheetItemRepository.removeByIds({ training_sheet_item_ids });

        return trainingSheetsItems;
    }

    async removeByTrainingSheetId(params: { training_sheet_id: number }) {
        if (!params.training_sheet_id) throw new Error('Missing Parameters');

        await trainingSheetItemRepository.removeByTrainingSheetId({ training_sheet_id: params.training_sheet_id });
    }

    async getTraininingSheetItemsDetails(params: { training_sheet_id: number }) {
        const trainingSheetItemsDetails = await trainingSheetItemRepository.getTrainingSheetItemById({ training_sheet_id: params.training_sheet_id });

        return trainingSheetItemsDetails;
    }
}

export { TrainingSheetItemsService }
