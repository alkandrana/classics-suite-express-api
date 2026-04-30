import {Router} from 'express';

import {
    getWorks, getWorksByAuthor, getWorksByTitle, getWorkById, getMetadata,
    createWork, updateWork, deleteWork
}
    from '../controllers/opus.controller.js';

const opusRouter = new Router();

/**
 * @swagger
 * /works:
 *   get:
 *     summary: Retrieve all works
 *     responses:
 *       200:
 *         description: A list of opus objects
 *         content: application/json
 */
opusRouter.get('/', getWorks);

opusRouter.get('/metadata', getMetadata);

/**
 * @swagger
 * /works/author/{name}:
 *   get:
 *     summary: Retrieve all works belonging to a specific author
 *     parameters:
 *     - in: path
 *       name: name
 *       type: string
 *       required: true
 *       description: Common name of an author
 *     responses:
 *       200:
 *         description: OK
 *         content: application/json
 *       400:
 *         description: Bad Request. Author name does not exist.
 */
opusRouter.get('/author/:name', getWorksByAuthor);

/**
 * @swagger
 * /works/title/{title}:
 *   get:
 *     summary: Retrieve works containing the given keyword or phrase
 *     parameters:
 *     - in: path
 *       name: title
 *       type: string
 *       required: true
 *       description: word or phrase representing all or some part of the title
 *     responses:
 *       200:
 *         description: OK. A list of works meeting the above criteria. Can be empty if no results match.
 *         content: application/json
 */
opusRouter.get('/title/:title', getWorksByTitle);

opusRouter.get('/:id', getWorkById);

/**
 * @swagger
 * /works:
 *   post:
 *     summary: Creates a new work.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: work
 *         description: The work to create.
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - title
 *             - authorId
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *             authorId:
 *               type: string
 *             language:
 *               type: string
 *     responses:
 *       201:
 *         description: Work added successfully.
 */
opusRouter.post('/', createWork);

/**
 * @swagger
 * /works/{id}:
 *   put:
 *     summary: Updates an existing work.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: work
 *         description: The work to create.
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - title
 *             - authorId
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *             authorId:
 *               type: string
 *             language:
 *               type: string
 *     responses:
 *       201:
 *         description: Work added successfully.
 */
opusRouter.put('/:id', updateWork);

/**
 * @swagger
 * /works/{id}:
 *   delete:
 *     summary: Deletes the work corresponding to the ID parameter.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The standard abbreviation of the work to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work deleted successfully
 */
opusRouter.delete('/:id', deleteWork);
export default opusRouter;