import prismaClient from "../prisma";

class UserRepository {
    async findUserByEmail(email: string) {
        const userInfo = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        return userInfo;
    }

    async findUserById(userId: number) {
        const userInfo = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        });

        return userInfo;
    }
    
    async createUser(params: {name: string, email: string, passwordHash: string }) {
        const user = await prismaClient.user.create({
            data: {
                username: params.name,
                email: params.email,
                password: params.passwordHash
            },
            select: {
                id: true,
                username: true,
                email: true,
            }
        })

        return user
    }
}

export { UserRepository }
