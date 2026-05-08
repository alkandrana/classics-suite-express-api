import {Router} from 'express';
import {getLanguages, createLanguage, updateLanguage, deleteLanguage}
    from '../controllers/language.controller.js';

const languageRouter = new Router();

languageRouter.get('/', getLanguages);
languageRouter.post('/', createLanguage);
languageRouter.delete('/:id', deleteLanguage);
languageRouter.update('/:id', updateLanguage);

export default languageRouter;