import prismaClient from "../prisma";
import  { mediator } from "../mediator/AppMediator";

interface HandleTrainingSheetItems {
  training_sheet_id?: number;
  item: {
    id?: number;
    name: string;
    description: string;
    repetitions: number;
    series: number;
    link: string;
  };
}

class TrainingSheetItemRepository {
  constructor() {
    this.initialize();
  }

  initialize() {
    mediator.on("trainingSheetItem:getById", async (params: { training_sheet_id: number }) => {
        return await this.getTrainingSheetItemById(params);
      });
  
      mediator.on("trainingSheetItem:create", async (params: HandleTrainingSheetItems) => {
        return await this.createTrainingSheetItem(params);
      });
  
      mediator.on("trainingSheetItem:update", async (params: HandleTrainingSheetItems) => {
        return await this.updateTrainingSheetItem(params);
      });
  
      mediator.on("trainingSheetItem:removeByTrainingSheetId", async (params: { training_sheet_id: number }) => {
        return await this.removeByTrainingSheetId(params);
      });
  
      mediator.on("trainingSheetItem:removeByIds", async (params: { training_sheet_item_ids: number[] }) => {
        return await this.removeByIds(params);
      });
  }

  async getTrainingSheetItemById(params: { training_sheet_id: number }) {
    const trainingSheetItemsDetails =
      await prismaClient.trainingSheetItem.findMany({
        where: {
          training_sheet_id: params.training_sheet_id,
        },
        select: {
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
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

    return trainingSheetItemsDetails;
  }

  async createTrainingSheetItem({
    training_sheet_id,
    item,
  }: HandleTrainingSheetItems) {
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
        id: item.id,
      },
      data: {
        name: item.name,
        description: item.description,
        repetitions: item.repetitions,
        series: item.series,
        link: item.link,
      },
    });
  }

  async removeByTrainingSheetId(params: { training_sheet_id: number }) {
    await prismaClient.trainingSheetItem.deleteMany({
      where: {
        training_sheet_id: params.training_sheet_id,
      },
    });
  }

  async removeByIds(params: { training_sheet_item_ids: number[] }) {
    const trainingSheetsItems = await prismaClient.trainingSheetItem.deleteMany(
      {
        where: {
          id: {
            in: params.training_sheet_item_ids,
          },
        },
      }
    );

    return trainingSheetsItems;
  }
}

export default new TrainingSheetItemRepository();
