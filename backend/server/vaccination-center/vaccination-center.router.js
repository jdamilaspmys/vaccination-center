import { Router } from 'express';
import vaccinationCenterCtrl from './vaccination-center.controller.js';

const router = Router();

router.route('/')
  .get(vaccinationCenterCtrl.list)

router.route('/:id')
  .get(vaccinationCenterCtrl.getById)

export default router;