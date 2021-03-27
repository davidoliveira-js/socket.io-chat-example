const express = require("express")
const app = express();
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const UserController = require('../controllers/UserController');

// rotas home
router.get('/', HomeController.index);
router.post('/auth', UserController.login);

// rotas usuarios
router.get('/users', UserController.index);
router.get('/users/:id', UserController.findById);
router.post('/users', UserController.create);
router.put('/users', UserController.edit);
router.delete('/users', UserController.remove);


module.exports = router;