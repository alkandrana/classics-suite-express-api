import {Router} from 'express';

import {
    getAuthors, getAuthorsByName, getAuthorById, getMetadata,
    createAuthor, updateAuthor, deleteAuthor
}
    from '../controllers/author.controller.js';

const authorRouter = new Router();

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve all authors
 *     responses:
 *       200:
 *         description: A list of Author objects
 *         content: application/json
 */
authorRouter.get('/', getAuthors);

authorRouter.get('/metadata', getMetadata);

/**
 * @swagger
 * /authors/name/{name}:
 *   get:
 *     summary: Retrieve authors whose names contain the given keyword or phrase
 *     parameters:
 *     - in: path
 *       name: name
 *       type: string
 *       required: true
 *       description: word or phrase representing all or some part of the author's name
 *     responses:
 *       200:
 *         description: OK. A list of authors meeting the above criteria. Can be empty if no results match.
 *         content: application/json
 */
authorRouter.get('/name/:name', getAuthorsByName);


authorRouter.get('/:id', getAuthorById);


/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Creates a new author.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: author
 *         description: The author to create.
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - name
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             nomen:
 *               type: string
 *             praenomen:
 *               type: string
 *             cognomen:
 *               type: string
 *     responses:
 *       201:
 *         description: Work added successfully.
 */
authorRouter.post('/', createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   patch:
 *     summary: Updates an existing author.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: author
 *         description: The author to update.
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - name
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             nomen:
 *               type: string
 *             praenomen:
 *               type: string
 *             cognomen:
 *               type: string
 *     responses:
 *       201:
 *         description: Author updated successfully.
 */
authorRouter.patch('/:id', updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Deletes the author corresponding to the ID parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The standard abbreviation of the author to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully
 */
authorRouter.delete('/:id', deleteAuthor);
export default authorRouter;