import express from 'express';
import k8s from './k8s.route.js';
import ssh from './ssh.route.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * GET api/status
 */
router.get('/status', authMiddleware, (req, res) => res.status(200).send({ message: "Server is up!" }));

/**
 * GET v1/docs
 */
// router.use('/docs', express.static('docs'));

router.use('/k8s', k8s);   // k8s api
router.use('/ssh', ssh); // ssh api

export default router;
