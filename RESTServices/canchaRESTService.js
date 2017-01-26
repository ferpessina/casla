var CanchaRESTService = require('../services/canchaService');

module.exports = function(express,app) {

	/**
	 * @swagger
	 * definition:
	 *   Cancha:
	 *     properties:
	 *       nombre:
	 *         type: string
	 *       torneo_actual:
	 *         type: string
	*/
	var canchas = express.Router();

	/**
	 * @swagger
	 * /cancha:
	 *   get:
	 *     tags:
	 *       - Cancha
	 *     description: Returns all canchas
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of canchas
	 *         schema:
	 *           $ref: '#/definitions/Cancha'
	 */
	canchas.get('/', CanchaRESTService.findAllCanchas);

	/**
	 * @swagger
	 * /cancha:
	 *   post:
	 *     tags:
	 *       - Cancha
	 *     description: Creates a new cancha
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: cancha
	 *         description: Cancha object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Cancha'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	canchas.post('/', CanchaRESTService.addCancha);

	/**
	 * @swagger
	 * /cancha/{id}:
	 *   get:
	 *     tags:
	 *       - Cancha
	 *     description: Returns a single cancha
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Cancha's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: A single cancha
	 *         schema:
	 *           $ref: '#/definitions/Cancha'
	 */
	canchas.get('/:id', CanchaRESTService.findById);

	/**
	 * @swagger
	 * /cancha/{id}:
	 *   put:
	 *     tags:
	 *       - Cancha
	 *     description: Updates a single cancha
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Cancha's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: cancha
	 *         description: New fields for the Cancha resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Cancha'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	canchas.put('/:id', CanchaRESTService.updateCancha);

	/**
	 * @swagger
	 * /cancha/{id}:
	 *   delete:
	 *     tags:
	 *       - Cancha
	 *     description: Deletes a single cancha
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Cancha's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	canchas.delete('/:id', CanchaRESTService.deleteCancha);


	app.use('/cancha', canchas);

};
