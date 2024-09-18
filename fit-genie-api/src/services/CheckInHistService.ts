import { mediator } from "../mediator/AppMediator";

class CheckInHistService {
    async createCheckIn(params: { userId: number }) {
        if (!params.userId) throw Error("Missing Parameters");

        const checkInHist = await mediator.publish('checkInHist:create', params);

        return checkInHist;
    }

    async getCheckInHist(params: { userId: number }) {
        if (!params.userId) throw Error("Missing Parameters");

        const today = new Date();

        const checkInHist = await mediator.publish('checkInHist:get', { userId: params.userId, year: today.getFullYear() });
        
        const checkInsByMonth = {};
        checkInHist.forEach((record) => {
            const month = record.month;
            checkInsByMonth[month] = Number(record.count);
        });

        for (let month = 1; month <= 12; month++) {
            if (!checkInsByMonth[month]) {
                checkInsByMonth[month] = 0;
            }
        }

        return checkInsByMonth;
    }

    async verifyCheckInToday(params: { userId: number }) {
        if (!params.userId) throw Error("Missing Parameters");
        
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        
        const checkInToday = await mediator.publish('checkInHist:verifyToday', { todayStart, todayEnd, userId: params.userId });
        
        return checkInToday;
    }
}

export { CheckInHistService };
