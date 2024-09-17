import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const userService = new UserService();

        const user = await userService.createUser({ name, email, password });

        return res.json(user)
    }

    async updatePhoto(req: Request, res: Response) {
        const { userId, image } = req.body;

        const userService = new UserService();

        const user = await userService.updateUserPhoto({ userId, image });

        return res.json(user)
    }
}

export { UserController }
