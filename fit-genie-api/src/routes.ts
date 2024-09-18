import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { TrainingSheetController } from "./controllers/TrainingSheetController";
import { TrainingSheetItemController } from "./controllers/TrainingSheetItemController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CheckInHistController } from "./controllers/CheckInHistController";
import './repository/UserRepository';
import './repository/TrainingSheetRepository';
import './repository/TrainingSheetItemRepository';
import './repository/CheckInHistRepository';
import multer from 'multer';

const upload = multer();

const router = Router();

const userController = new UserController();
const loginController = new LoginController();
const trainingSheetController = new TrainingSheetController();
const trainingSheetItemController = new TrainingSheetItemController();
const checkInHistController = new CheckInHistController();

// User
router.post('/users', userController.createUser);
router.post('/users/update-photo', isAuthenticated, upload.single('file'), userController.updatePhoto);
router.get('/users/get-photo/:user_id', isAuthenticated, userController.getUserPhoto);

// Login
router.get('/my-profile', isAuthenticated, loginController.myProfile);
router.post('/login', loginController.authenticate);

// Training Sheet
router.post('/training-sheet', isAuthenticated, trainingSheetController.createOrder);
router.delete('/training-sheet/delete/:training_sheet_id', isAuthenticated, trainingSheetController.removeTrainingSheet);
router.get('/training-sheet/detail/:training_sheet_id', isAuthenticated, trainingSheetController.getTrainingSheetDetails);
router.get('/training-sheet/user/:user_id', isAuthenticated, trainingSheetController.getTrainingSheetsByUser);
router.put('/training-sheet/update', isAuthenticated, trainingSheetController.updateTrainingSheet);

// Training Sheet Items
router.post('/training-sheet-item', isAuthenticated, trainingSheetItemController.createTrainingSheetItems);
router.put('/training-sheet-item/update', isAuthenticated, trainingSheetItemController.updateTrainingSheetItems);
router.delete('/training-sheet-item/delete', isAuthenticated, trainingSheetItemController.removeTrainingSheetItems);

// Check In History
router.post('/checkIn', isAuthenticated, checkInHistController.createCheckIn);
router.get('/checkIn-hist/:userId', isAuthenticated, checkInHistController.getCheckInHist);
router.get('/verify-checkIn-today/:userId', isAuthenticated, checkInHistController.verifyCheckInToday);

export { router };
