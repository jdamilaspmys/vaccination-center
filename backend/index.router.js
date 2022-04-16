import express from 'express';

import vaccinationCenter from './server/vaccination-center/vaccination-center.router.js';
import booking from './server/booking/booking.router.js';

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount vaccination-center routes at /vaccination-center
router.use('/vaccination-center', vaccinationCenter);

// mount booking routes at /booking
router.use('/booking', booking);

export default router;