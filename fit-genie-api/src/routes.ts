import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { isAuthenticated } from "./middlewares/isAuthenticated";


const router = Router();

const userController = new UserController();
const loginController = new LoginController();


// User
router.post('/users', userController.createUser);

// Login
router.get('/my-profile', isAuthenticated, loginController.myProfile);
router.post('/login', loginController.authenticate);

export { router };