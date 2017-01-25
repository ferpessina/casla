var UserCtrl = require('../controllers/userController');

module.exports = function(express,app) {



	/**
	 * @swagger
	 * definition:
	 *   User:
	 *     properties:
	 *       email:
	 *         type: string
	 *       password:
	 *         type: string
	 *       role:
	 *         type: string
     *   	   enum:
     *    	   - GET
	*/
	
	var usuarios = express.Router();


	/**
	 * @swagger
	 * /user:
	 *   get:
	 *     tags:
	 *       - User
	 *     description: Returns all users
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: An array of users
	 *         schema:
	 *           $ref: '#/definitions/User'
	 */
	usuarios.get('/', UserCtrl.findAllUsuarios);

	 /**
	 * @swagger
	 * /user:
	 *   post:
	 *     tags:
	 *       - User
	 *     description: Creates a new user
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: user
	 *         description: User object
	 *         in: body
	 *         required: true
	 *         schema:
	 *           $ref: '#/definitions/User'
	 *     responses:
	 *       200:
	 *         description: Successfully created
	 */
	 usuarios.post('/', UserCtrl.addUser);  //TRATAR DE USAR EL DE PASSPORT.JS PREFERENTEMENTE
	 
	/**
	 * @swagger
	 * /user/{id}:
	 *   delete:
	 *     tags:
	 *       - User
	 *     description: Deletes a single user
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: id
	 *         description: User's id
	 *         in: path
	 *         required: true
	 *         type: integer
	 *     responses:
	 *       200:
	 *         description: Successfully deleted
	 */
	usuarios.delete('/:id', UserCtrl.deleteUser);



	app.use('/user', usuarios);

};