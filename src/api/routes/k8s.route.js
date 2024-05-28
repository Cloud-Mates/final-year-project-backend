import express from 'express';
import k8sController from "../controllers/k8s.controller.js";
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();
const { componentStatus, dashboard, events, namespaces, nodes, pods, services, test } = k8sController;

router.route('/test').post(authMiddleware, test);
router.route('/dashboard').post(authMiddleware, dashboard);
router.route('/events').post(authMiddleware, events);
router.route('/componentStatus').post(authMiddleware, componentStatus);
router.route('/namespaces').post(authMiddleware, namespaces);
router.route('/nodes').post(authMiddleware, nodes);
router.route('/pods').post(authMiddleware, pods);
router.route('/services').post(authMiddleware, services);

export default router;