import express from 'express';
import k8s from './k8s.route.js';
import ssh from './ssh.route.js';

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
// router.use('/docs', express.static('docs'));

router.use('/k8s', k8s);   // k8s api
router.use('/ssh', ssh); // ssh api

export default router;
