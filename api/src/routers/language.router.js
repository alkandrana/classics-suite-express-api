import {Router} from 'express';
import {getLanguages, getLanguage, createLanguage, updateLanguage, deleteLanguage}
    from '../controllers/language.controller.js';

const languageRouter = new Router();

languageRouter.get('/', getLanguages);
languageRouter.get('/:id', getLanguage);
languageRouter.post('/', createLanguage);
languageRouter.delete('/:id', deleteLanguage);
languageRouter.patch('/:id', updateLanguage);

export default languageRouter;