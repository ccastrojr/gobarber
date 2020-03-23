import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppoitmentController from './app/controllers/AppoitmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailibleController from './app/controllers/AvailibleController';

import authMiddleware from './app/middlewares/auth';
import authProvider from './app/middlewares/authProvider';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/availible', AvailibleController.index);

routes.post('/appoitments', AppoitmentController.store);
routes.get('/appoitments', AppoitmentController.index);
routes.delete('/appoitments/:id', AppoitmentController.delete);

routes.get('/schedule', authProvider, ScheduleController.index);

routes.get('/notifications', authProvider, NotificationController.index);
routes.put('/notifications/:id', authProvider, NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
