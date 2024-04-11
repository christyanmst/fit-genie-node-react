import prismaClient from "../prisma";

class TrainingSheetRepository {
    async createTrainingSheet(params: { user_id: number, name: string }) {
        const trainingSheet = await prismaClient.trainingSheet.create({
            data: {
                user_id: params.user_id,
                name: params.name,
            },
            select: {
                id: true,
                name: true,
                user_id: true,
            }
        });

        return trainingSheet;
    }

    async removeTrainingSheet(params: { training_sheet_id: number }) {
        const trainingSheet = await prismaClient.trainingSheet.delete({
            where: {
                id: params.training_sheet_id,
            }
        });

        return trainingSheet;
    }

    async getTrainingSheet(params: { user_id: number }) {
        const trainingSheets = await prismaClient.trainingSheet.findMany({
            where: {
                user_id: params.user_id,
            }, 
            orderBy: {
                name: 'asc',
            },
            select: {
                id: true,
                name: true,
            }
        });

        return trainingSheets;
    }

    async updateTrainingSheet(params: { training_sheet_id: number, name: string }) {
        const trainingSheet = await prismaClient.trainingSheet.update({
            where: {
                id: params.training_sheet_id,
            },
            data: {
                name: params.name,
            },
        });

        return trainingSheet;
    }
}

export { TrainingSheetRepository }
