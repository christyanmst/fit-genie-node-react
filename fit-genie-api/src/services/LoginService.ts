import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../repository/UserRepository";

interface AuthRequest {
    email: string;
    password: string;
}

const userRepository = new UserRepository();
class LoginService {
    async authenticate({ email, password }: AuthRequest) {
        
        const user = await userRepository.findUserByEmail(email);

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
        const user = await userRepository.findUserById(user_id);

        return user;
    }
}

export { LoginService }
