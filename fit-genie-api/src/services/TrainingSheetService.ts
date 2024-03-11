import prismaClient from "../prisma";

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

        const trainingSheet = await prismaClient.trainingSheet.create({
            data: {
                user_id: user_id,
                name: name,
            },
            select: {
                id: true,
                name: true,
                user_id: true,
            }
        });

        return trainingSheet;
    }

    async removeTrainingSheet({ training_sheet_id }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');

        await prismaClient.trainingSheetItem.deleteMany({
            where: {
                training_sheet_id
            }
        });
        
        const trainingSheet = await prismaClient.trainingSheet.delete({
            where: {
                id: training_sheet_id,
            }
        });

        return trainingSheet;
    }

    async getTrainingSheets({ user_id }: GetTrainingSheets ) {
        if (!user_id) throw new Error('Missing parameters');

        const trainingSheets = await prismaClient.trainingSheet.findMany({
            where: {
                user_id: user_id,
            }, 
            orderBy: {
                created_at: 'desc',
            },
            select: {
                id: true,
                name: true,
            }
        });

        return trainingSheets;
    }

    async getTrainingSheetsDetails({ training_sheet_id }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');
        
        const trainingSheetItemsDetails = await prismaClient.trainingSheetItem.findMany({
            where: {
                training_sheet_id: training_sheet_id,
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

    async updateTrainingSheet({ training_sheet_id, name }: HandleTrainingSheet) {
        if (!training_sheet_id) throw new Error('Missing parameters');

        const trainingSheet = await prismaClient.trainingSheet.update({
            where: {
                id: training_sheet_id,
            },
            data: {
                name,
            },
        });

        return trainingSheet;
    }
}

export { TrainingSheetService }; 