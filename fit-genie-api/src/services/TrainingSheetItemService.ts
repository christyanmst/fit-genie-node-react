import prismaClient from "../prisma";

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

class TrainingSheetItemsService {
    async createTrainingSheetItems({ training_sheet_id, items }: HandleTrainingSheetItems) {
        if (!(training_sheet_id && items.length)) throw new Error('Missing parameters');


        for (const item of items) {
            await prismaClient.trainingSheetItem.create({
                data: {
                    training_sheet_id,
                    name: item.name,
                    description: item.description,
                    repetitions: item.repetitions,
                    series: item.series,
                    link: item.link,
                },
            });
        }

        return { ok: true };
    }

    async updateTrainingSheetItems({ items }: HandleTrainingSheetItems) {
        if (!items.length) throw new Error('Missing parameters');


        for (const item of items) {
            await prismaClient.trainingSheetItem.update({
                where: {
                    id: item.id
                },
                data: {
                    name: item.name,
                    description: item.description,
                    repetitions: item.repetitions,
                    series: item.series,
                    link: item.link,
                }
            });
        }

        return { ok: true };
    }

    async removeTrainingSheetItems({ training_sheet_item_ids }: RemoveTrainingSheetItems) {
        if (!training_sheet_item_ids.length) throw new Error('Missing parameters');

        const trainingSheetsItems = await prismaClient.trainingSheetItem.deleteMany({
            where: {
                id: {
                    in: training_sheet_item_ids
                }
            }
        });

        return trainingSheetsItems;
    }
}

export { TrainingSheetItemsService }