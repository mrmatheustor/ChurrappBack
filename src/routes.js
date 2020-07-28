const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer')


const UsuarioController = require('./controllers/UsuarioController');
const FotosController = require('./controllers/FotosController');
const ChurrasController = require('./controllers/ChurrasController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const ItemsController = require('./controllers/ItemsController');
const PontoCarneController = require('./controllers/PontoCarneController');
const ListaChurrascoController = require('./controllers/ListaChurrascoController');
const TiposController = require('./controllers//TipoController');
const UnidadesController = require('./controllers/UnidadesController');
const EstoqueController = require('./controllers/EstoqueController');
const SugestaoController = require('./controllers/SugestaoController');
const QuantidadeComeController = require('./controllers/QuantidadeComeControle');
const ConvidadosController = require('./controllers/ConvidadosController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/usuarios', UsuarioController.list);
routes.get('/usuarios/:id', UsuarioController.listLogado);
routes.get('/usuariosCel/:celular', UsuarioController.listCelularUsuario);
routes.post('/usuarios', UsuarioController.create);
routes.put('/usuarios/:id', UsuarioController.update);

routes.get('/fotos', FotosController.list);
routes.post('/fotos',multer(multerConfig).single('file'), FotosController.create);
routes.delete('/fotos/:key', FotosController.delete);

routes.get('/perfil', ProfileController.list);

routes.get('/churras', ChurrasController.list);
routes.get('/churras/:usuario_id', ChurrasController.logado);
routes.get('/churraspassados', ChurrasController.dataPassado);
routes.get('/churrasfuturo', ChurrasController.dataFuturo);
routes.post('/churras', ChurrasController.create);
routes.delete('/churras/:id', ChurrasController.delete);

routes.get('/item', ItemsController.listAll);
routes.get('/items', ItemsController.listLimit);
routes.post('/item', ItemsController.create);
routes.delete('/item/:id', ItemsController.delete);

routes.get('/pontoCarne', PontoCarneController.list);

routes.get('/listadochurras/:churras_id', ListaChurrascoController.list);
routes.post('/listadochurras', ListaChurrascoController.create);
routes.delete('/listadochurras/:id', ListaChurrascoController.delete);

routes.get('/tipo', TiposController.list);

routes.get('/unidade', UnidadesController.list);

routes.get('/estoque/:usuario_id', EstoqueController.list);

routes.get('/sugestao', SugestaoController.list);

routes.get('/quantidadecome', QuantidadeComeController.list);

routes.get('/convidados', ConvidadosController.list);
routes.get('/convidados/:churras_id', ConvidadosController.listChurras);
routes.post('/convidadosChurras/:usuario_id', ConvidadosController.create);



module.exports = routes;