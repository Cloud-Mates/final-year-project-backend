import express from 'express';
import sshController from "../controllers/ssh.controller.js";
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
const { test, exec } = sshController;

router.route('/test').post(authMiddleware, test);
router.route('/exec').post(authMiddleware, exec);

export default router;