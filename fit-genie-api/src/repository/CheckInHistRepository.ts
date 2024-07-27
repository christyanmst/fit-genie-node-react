import prismaClient from "../prisma";

class CheckInHistRepository {
    async getCheckInHist(userId: number, year: number) {
        const checkInCounts: {
            month: string,
            count: string,
        }[] = await prismaClient.$queryRaw`
        SELECT 
            EXTRACT(MONTH FROM created_at) AS month,
            COUNT(*) AS count
        FROM 
            checkin_hist
        WHERE 
            user_id = ${userId}
            AND EXTRACT(YEAR FROM created_at) = ${year}
        GROUP BY 
            EXTRACT(MONTH FROM created_at)
        `;

        return checkInCounts;
    }

    async createCheckIn(params: { userId: number}) {
        const checkIn = await prismaClient.checkInHist.create({
            data: {
                user_id: params.userId,
            },
            select: {
                id: true,
            }
        })

        return checkIn;
    }

    async verifyCheckInToday(params: { todayStart: Date, todayEnd: Date, userId: number }) {
        const checkInToday = await prismaClient.checkInHist.findFirst({
            where: {
                user_id: params.userId,
                created_at: {
                    gte: params.todayStart,
                    lte: params.todayEnd,
                },
            },
        });

        return !!checkInToday;
    }
}

export { CheckInHistRepository }
