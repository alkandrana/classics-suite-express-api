import {Router} from 'express';
import {getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor} from '../controllers/author.controller.js';

const authorRouter = new Router();
authorRouter.get('/', getAuthors);
authorRouter.post('/', createAuthor);
authorRouter.get('/:id', getAuthor);
authorRouter.patch('/:id', updateAuthor);
authorRouter.delete('/:id', deleteAuthor);

export default authorRouter;