// Routes/loginRoute.js
import express from 'express';
import { loginUser } from '../Controllers/loginController.js';

const router = express.Router();

router.post('/login', loginUser);

export default router;

