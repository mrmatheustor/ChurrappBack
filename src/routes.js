const express = require('express');
const multer = require('multer');
const multerConfigPerfil = require('./config/multerPerfil')
const multerConfigChurrasco = require('./config/multerChurrasco')
const multerConfigItens = require('./config/multerItens')


const UsuarioController = require('./controllers/UsuarioController');
const FotosItensController = require('./controllers/FotosItensController');
const FotosChurrasController = require('./controllers/FotosChurrasController');
const FotosUsuariosController = require('./controllers/FotosUsuariosController');
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
routes.patch('/usuarios/:id', UsuarioController.update);

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





// Rotas para tratamento das fotos itens usuarios churrascos

routes.get('/fotosUsuarios', FotosUsuariosController.list);
routes.post('/fotosUsuarios',multer(multerConfigPerfil).single('file'), FotosUsuariosController.create);
routes.delete('/fotosUsuarios/:key', FotosUsuariosController.delete);

routes.get('/fotosChurras', FotosChurrasController.list);
routes.post('/fotosChurras',multer(multerConfigChurrasco).single('file'), FotosChurrasController.create);
routes.delete('/fotosChurras/:key', FotosChurrasController.delete);

routes.get('/fotosItens', FotosItensController.list);
routes.post('/fotosItens',multer(multerConfigItens).single('file'), FotosItensController.create);
routes.delete('/fotosItens/:key', FotosItensController.delete);

module.exports = routes;