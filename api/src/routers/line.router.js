import {Router} from 'express';
import {getLines, getLinesByOpus, getLine, createLine, updateLine, deleteLine}
    from '../controllers/line.controller.js';

const lineRouter = new Router();
lineRouter.get('/', getLines);
lineRouter.get('/work/:id', getLinesByOpus);
lineRouter.post('/', createLine);
lineRouter.get('/:id', getLine);
lineRouter.patch('/:id', updateLine);
lineRouter.delete('/:id', deleteLine);

export default lineRouter;