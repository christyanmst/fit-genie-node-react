import { Request, Response } from "express";
import { appFacade } from "../facade/AppFacade";

class UserController {
    async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const user = await appFacade.createUser(name, email, password);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updatePhoto(req: Request, res: Response) {
        const { userId, image } = req.body;

        try {
            const user = await appFacade.updateUserPhoto(userId, image);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { UserController };
