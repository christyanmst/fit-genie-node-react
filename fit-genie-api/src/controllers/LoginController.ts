import { Request, Response } from "express";
import { appFacade } from "../facade/AppFacade";

class LoginController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const auth = await appFacade.authenticate(email, password);
      return res.json(auth);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async myProfile(req: Request, res: Response) {
    const user_id = req.user_id;

    try {
      const profile = await appFacade.getMyProfile(user_id);
      return res.json(profile);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { LoginController };
