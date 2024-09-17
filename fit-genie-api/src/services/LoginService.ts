import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { mediator } from "../mediator/AppMediator";

interface AuthRequest {
    email: string;
    password: string;
}

class LoginService {
    async authenticate({ email, password }: AuthRequest) {
        const user: { id: number, password: string, email: string, username: string } = await mediator.publish('user:findByEmail', email);
        
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
                expiresIn: '15d',
            }
        );

        return { 
            id: user.id,
            username: user.username,
            email: user.email,
            token,
        };
    }

    async myProfile(user_id: number) {
        const user = await mediator.publish('user:findById', user_id);

        return user;
    }
}

export { LoginService };
