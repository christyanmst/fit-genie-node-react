import prismaClient from "../prisma";
import { hash } from "bcryptjs";

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

class UserService {
    async createUser({ name, email, password }: CreateUserRequest) {
        if(!(name && email && password)) throw new Error("Missing parameters");

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) throw new Error("User already exists");

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                username: name,
                email: email,
                password: passwordHash
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

export { UserService }
