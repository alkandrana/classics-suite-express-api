import {Router} from 'express';
import {getOpera, getOpus, getOpusByCode, createOpus, updateOpus, deleteOpus}
    from '../controllers/opus.controller.js';

const opusRouter = new Router();
opusRouter.get('/', getOpera);
opusRouter.post('/', createOpus);
opusRouter.get('/code/:code', getOpusByCode);
opusRouter.get('/:id', getOpus);
opusRouter.patch('/:id', updateOpus);
opusRouter.delete('/:id', deleteOpus);

export default opusRouter;