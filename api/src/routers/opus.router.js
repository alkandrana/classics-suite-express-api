import {Router} from 'express';
import {getOpera, getOpus, createOpus, updateOpus, deleteOpus}
    from '../controllers/opus.controller.js';

const opusRouter = new Router();
opusRouter.get('/', getOpera);
opusRouter.post('/', createOpus);
opusRouter.get('/:id', getOpus);
opusRouter.patch('/:id', updateOpus);
opusRouter.delete('/:id', deleteOpus);

export default opusRouter;