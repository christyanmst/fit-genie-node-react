import prismaClient from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class LoginService {
    async authenticate({ email, password }: AuthRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });


        if (!user) throw new Error('Credential Error');

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new Error('Credential Error');

        const token = sign(
            {
                username: user.username,
                email: user.email,
            }, 
            process.env.JWT_SECRET,
            {
                subject: String(user.id),
                expiresIn: '15d'
            }
        )

        return { 
            id: user.id,
            username: user.username,
            email: user.email,
            token: token,
         }
    }

    async myProfile(user_id: number) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            }, select: {
                id: true,
                username: true,
                email: true,
            }
        })

        return user;
    }
}

export { LoginService }
