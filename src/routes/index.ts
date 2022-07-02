import express from 'express';
const router = express.Router();
import CompanyRouter from './CompanyRouter';
import CollaboratorRouter from './CollaboratorRouter';

router.use('/company', CompanyRouter);
router.use('/collaborator', CollaboratorRouter);

export default router;