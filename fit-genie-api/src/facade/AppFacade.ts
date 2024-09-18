import { CheckInHistService } from "../services/CheckInHistService";
import { LoginService } from "../services/LoginService";
import { TrainingSheetItemsService } from "../services/TrainingSheetItemService";
import { TrainingSheetService } from "../services/TrainingSheetService";
import { UserService } from "../services/UserService";


class AppFacade {
    private loginService = new LoginService();
    private userService = new UserService();
    private checkInHistService = new CheckInHistService();
    private trainingSheetService = new TrainingSheetService();
    private trainingSheetItemService = new TrainingSheetItemsService();

    async authenticate(email: string, password: string) {
        return await this.loginService.authenticate({ email, password });
    }

    async getMyProfile(userId: number) {
        return await this.loginService.myProfile(userId);
    }

    async createUser(name: string, email: string, password: string) {
        return await this.userService.createUser({ name, email, password });
    }

    async updateUserPhoto(userId: number, image: Express.Multer.File) {
        return await this.userService.updateUserPhoto({ userId, image });
    }

    async getUserPhoto(userId: number) {
        return await this.userService.getUserPhoto(userId);
    }

    async createCheckIn(userId: number) {
        return await this.checkInHistService.createCheckIn({ userId });
    }

    async getCheckInHistory(userId: number) {
        return await this.checkInHistService.getCheckInHist({ userId });
    }

    async verifyCheckInToday(userId: number) {
        return await this.checkInHistService.verifyCheckInToday({ userId });
    }

    async createTrainingSheet(user_id: number, name: string) {
        return await this.trainingSheetService.createTrainingSheet({ user_id, name });
    }

    async removeTrainingSheet(training_sheet_id: number) {
        return await this.trainingSheetService.removeTrainingSheet({ training_sheet_id });
    }

    async getTrainingSheetDetails(training_sheet_id: number) {
        return await this.trainingSheetService.getTrainingSheetsDetails({ training_sheet_id });
    }

    async getTrainingSheetsByUser(user_id: number) {
        return await this.trainingSheetService.getTrainingSheets({ user_id });
    }

    async updateTrainingSheet(training_sheet_id: number, name: string) {
        return await this.trainingSheetService.updateTrainingSheet({ training_sheet_id, name });
    }

    async createTrainingSheetItems(training_sheet_id: number, items: { id?: number; name: string; description: string; repetitions: number; series: number; link: string; }[]) {
        return await this.trainingSheetItemService.createTrainingSheetItems({ training_sheet_id, items });
    }

    async updateTrainingSheetItems(items: { id?: number; name: string; description: string; repetitions: number; series: number; link: string; }[]) {
        return await this.trainingSheetItemService.updateTrainingSheetItems({ items });
    }

    async removeTrainingSheetItems(training_sheet_item_ids: number[]) {
        return await this.trainingSheetItemService.removeTrainingSheetItems({ training_sheet_item_ids });
    }
}

export const appFacade = new AppFacade();
