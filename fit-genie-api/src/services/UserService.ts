import { hash } from "bcryptjs";
import { mediator } from "../mediator/AppMediator";

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

interface UpdateUserRequest {
    userId: number;
    image: string;
}

class UserService {
    async createUser({ name, email, password }: CreateUserRequest) {
        if (!(name && email && password)) throw new Error("Missing parameters");

        const userAlreadyExists = await mediator.publish('user:findByEmail', email);

        if (userAlreadyExists) throw new Error("User already exists");

        const passwordHash = await hash(password, 8);

        const user = await mediator.publish('user:create', { name, email, passwordHash });

        return user;
    }

    async updateUserPhoto({ userId, image }: UpdateUserRequest) {
        if (!(userId && image)) throw new Error("Missing parameters");
        const userIdAux = Number(userId);

        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const photoBuffer = Buffer.from(base64Data, 'base64');

        const userInfo = await mediator.publish('user:findById', userIdAux);

        if (!userInfo) throw new Error("User not found");

        const user = await mediator.publish('user:updatePhoto', { userId: userIdAux, image: photoBuffer });

        return user;
    }
}

export { UserService };
