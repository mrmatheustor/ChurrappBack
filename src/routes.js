const express = require('express');


const UsuarioController = require('./controllers/UsuarioController');
const ChurrasController = require('./controllers/ChurrasController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/usuarios', UsuarioController.list);
routes.post('/usuarios', UsuarioController.create);

routes.get('/perfil', ProfileController.list);

routes.get('/churras', ChurrasController.list);
routes.get('/churras/:usuario_id', ChurrasController.logado);
routes.get('/churraspassados/', ChurrasController.dataPassado);
routes.post('/churras', ChurrasController.create);
routes.delete('/churras/:id', ChurrasController.delete);

module.exports = routes;