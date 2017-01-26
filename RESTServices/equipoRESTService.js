var EquipoCtrl = require('../services/equipoService');

module.exports = function(express,app) {

	/**
	 * @swagger
	 * definition:
	 *   Torneo:
	 *     properties:
	 *       nombre:
	 *         type: string
	 *       jugadores_por_equipo:
	 *         type: integer
	 *       activo:
	 *         type: boolean
	 *       canchas:
	 *         $ref: Cancha
	 *       equipos:
	 *         $ref: Equipo
	*/
	var equipos = express.Router();

	/**
	 * @swagger
	 * /equipo:
	 *   get:
	 *     tags:
	 *       - Equipo
	 *     description: Returns all equipos
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of equipos
	 *         schema:
	 *           $ref: '#/definitions/Equipo'
	 */
	equipos.get('/', EquipoCtrl.findAllEquipos);


	 /**
	 * @swagger
	 * /equipo:
	 *   post:
	 *     tags:
	 *       - Equipo
	 *     description: Creates a new equipo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: equipo
	 *         description: Equipo object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Equipo'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 equipos.post('/', EquipoCtrl.addEquipo);

	 /**
	 * @swagger
	 * /equipo/{id}:
	 *   get:
	 *     tags:
	 *       - Equipo
	 *     description: Returns a single equipo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Equipo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: A single equipo
	 *         schema:
	 *           $ref: '#/definitions/Equipo'
	 */
	 equipos.get('/:id', EquipoCtrl.findById);


	 /**
	 * @swagger
	 * /equipo/{id}:
	 *   put:
	 *     tags:
	 *       - Equipo
	 *     description: Updates a single equipo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Equipo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *       - name: equipo
	 *         description: New fields for the Equipo resource
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Equipo'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 equipos.put('/:id', EquipoCtrl.updateEquipo);

	 /**
	 * @swagger
	 * /equipo/{id}:
	 *   delete:
	 *     tags:
	 *       - Equipo
	 *     description: Deletes a single equipo
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Equipo's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	equipos.delete('/:id', EquipoCtrl.deleteEquipo);


	app.use('/equipo', equipos);

};
