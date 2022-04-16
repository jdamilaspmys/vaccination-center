import { Router } from 'express';
import bookingCtrl from './booking.controller.js';

const router = Router();

router.route('/')
  .get(bookingCtrl.list)
  .post(bookingCtrl.create)

router.route('/:id')
  .get(bookingCtrl.getById)
  .delete(bookingCtrl.deleteById)
  .put(bookingCtrl.updateById)

export default router;