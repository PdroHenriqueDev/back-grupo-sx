import express from 'express';
import { CompanyController } from './../controller/CompanyController';

const router = express.Router();
const controller = new CompanyController();

router.post('/create', controller.new);
router.get('', controller.find);
router.put('/:code', controller.update);
router.delete('/:code', controller.delete);

export default router;