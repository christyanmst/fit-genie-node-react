import { Request, Response } from "express";
import { appFacade } from "../facade/AppFacade";

interface MulterRequest extends Request {
    file: Express.Multer.File;
}
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

    async updatePhoto(req: MulterRequest, res: Response) {
        const { userId } = req.body;
        const file = req.file;

        try {
            const user = await appFacade.updateUserPhoto(userId, file);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getUserPhoto(req: Request, res: Response) {
        const user_id = req.user_id;
    
        try {
          const profile = await appFacade.getUserPhoto(user_id);
          return res.json(profile);
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      }
}

export { UserController };
