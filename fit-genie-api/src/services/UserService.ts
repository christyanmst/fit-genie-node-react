import { hash } from "bcryptjs";
import { UserRepository } from "../repository/UserRepository";

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

const userRepository = new UserRepository();
class UserService {
    async createUser({ name, email, password }: CreateUserRequest) {
        if(!(name && email && password)) throw new Error("Missing parameters");

        const userAlreadyExists = await userRepository.findUserByEmail(email);

        if (userAlreadyExists) throw new Error("User already exists");

        const passwordHash = await hash(password, 8);

        const user = await userRepository.createUser({ name, email, passwordHash });

        return user
    }
}

export { UserService }
