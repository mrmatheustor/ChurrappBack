const express = require('express');


const UsuarioController = require('./controllers/UsuarioController');
const ChurrasController = require('./controllers/ChurrasController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const ItemsController = require('./controllers/ItemsController');


const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/usuarios', UsuarioController.list);
routes.post('/usuarios', UsuarioController.create);

routes.get('/perfil', ProfileController.list);

routes.get('/churras', ChurrasController.list);
routes.get('/churras/:usuario_id', ChurrasController.logado);
routes.get('/churraspassados', ChurrasController.dataPassado);
routes.get('/churrasfuturo', ChurrasController.dataFuturo);
routes.post('/churras', ChurrasController.create);
routes.delete('/churras/:id', ChurrasController.delete);

routes.get('/itemdochurras', ItemsController.list);
routes.get('/item', ItemsController.listAll);
routes.post('/item', ItemsController.create);
routes.delete('/item/:id', ItemsController.delete);

module.exports = routes;