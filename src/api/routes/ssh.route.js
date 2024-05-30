import express from 'express';
import multer from 'multer'
import sshController from "../controllers/ssh.controller.js";
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
const { exec } = sshController;


router.route('/exec').post(authMiddleware, multer().any(), exec);

export default router;