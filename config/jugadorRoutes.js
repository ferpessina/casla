var JugadorCtrl = require('../controllers/jugadorController');

module.exports = function(express,app) {
	/**
	 * @swagger
	 * definition:
	 *   Jugador:
	 *     properties:
	 *       nombre:
	 *         type: string
	 *       apellido:
	 *         type: string
	 *       fecha_de_nacimiento:
	 *         format: date
	 *       apodo:
	 *         type: string
	 *       dni:
	 *         type: integer
	 *       posicion:
	 *         type: string
	 *       numero:
	 *         type: integer
	 *       email:
	 *         type: string
	 *       capitan:
	 *         type: boolean
	 *       subcapitan:
	 *         type: boolean
	 *       equipo:
	 *         $ref: Equipo
	*/

	var jugadores = express.Router();

	/**
	 * @swagger
	 * /jugador:
	 *   get:
	 *     tags:
	 *       - Jugador
	 *     description: Returns all jugadores
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of jugadores
	 *         schema:
	 *           $ref: '#/definitions/Jugador'
	 */
	 jugadores.get('/', JugadorCtrl.findAllJugadores);

	 /**
	 * @swagger
	 * /jugador:
	 *   post:
	 *     tags:
	 *       - Jugador
	 *     description: Creates a new jugador
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: jugador
	 *         description: Jugador object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/Jugador'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 jugadores.post('/', JugadorCtrl.addJugador);

	 /**
	 * @swagger
	 * /jugador/{id}:
	 *   get:
	 *     tags:
	 *       - Jugador
	 *     description: Returns a single jugador
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Jugador's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: A single jugador
	 *         schema:
	 *           $ref: '#/definitions/Jugador'
	 */
	 jugadores.get('/:id', JugadorCtrl.findById);

	 /**
	 * @swagger
	 * /jugador/{id}:
	 *   put:
	 *     tags: Jugador
	 *     description: Updates a single jugador
	 *     produces: application/json
	 *     parameters:
	 *       name: jugador
	 *       in: body
	 *       description: Fields for the Jugador resource
	 *       schema:
	 *         type: array
	 *         $ref: '#/definitions/Jugador'
	 *     responses:
	 *       200:
	 *         description: Successfully updated
	 */
	 jugadores.put('/:id', JugadorCtrl.updateJugador);

	 /**
	 * @swagger
	 * /jugador/{id}:
	 *   delete:
	 *     tags:
	 *       - Jugador
	 *     description: Deletes a single jugador
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: Jugador's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	 jugadores.delete('/:id', JugadorCtrl.deleteJugador);


	app.use('/jugador', jugadores);

};