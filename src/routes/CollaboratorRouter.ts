import express from 'express';
import { CollaboratorController } from '../controller/CollaboratorController';

const router = express.Router();
const controller = new CollaboratorController();

router.post('/create', controller.new);
router.get('/', controller.find);
router.put('/:code', controller.update);
router.delete('/:code', controller.delete);

export default router;