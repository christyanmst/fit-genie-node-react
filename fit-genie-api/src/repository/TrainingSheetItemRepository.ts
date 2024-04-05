import prismaClient from "../prisma";

interface HandleTrainingSheetItems {
    training_sheet_id?: number,
    item: {
        id?: number;
        name: string,
        description: string,
        repetitions: number,
        series: number,
        link: string,
    }
}

class TrainingSheetItemRepository {
    async getTrainingSheetItemById(params: { training_sheet_id: number }) {
        const trainingSheetItemsDetails = await prismaClient.trainingSheetItem.findMany({
            where: {
                training_sheet_id: params.training_sheet_id,
            },
            select:{
                id: true,
                name: true,
                description: true,
                repetitions: true,
                series: true,
                link: true,
                training_sheet: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
        });

        return trainingSheetItemsDetails;
    }

    async createTrainingSheetItem({ training_sheet_id, item }: HandleTrainingSheetItems) {
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

    async updateTrainingSheetItem({ item }: HandleTrainingSheetItems) {
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

    async removeByTrainingSheetId(params: { training_sheet_id: number }) {
        await prismaClient.trainingSheetItem.deleteMany({
            where: {
                training_sheet_id: params.training_sheet_id
            }
        });
    }

    async removeByIds(params: { training_sheet_item_ids: number[] }) {
        const trainingSheetsItems = await prismaClient.trainingSheetItem.deleteMany({
            where: {
                id: {
                    in: params.training_sheet_item_ids
                }
            }
        });

        return trainingSheetsItems;
    }
}

export { TrainingSheetItemRepository }
