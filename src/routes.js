const express = require('express');
const multer = require('multer');
const multerConfigPerfil = require('./config/multerPerfil')
const multerConfigChurrasco = require('./config/multerChurrasco')
const multerConfigItens = require('./config/multerItens')
const multerConfigTipo = require('./config/multerTipo')


const UsuarioController = require('./controllers/UsuarioController');
const NotificacoesController = require('./controllers/NotificacoesController');
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
const SubTiposController = require('./controllers/SubTiposController');
const FormatosController = require('./controllers/FormatosController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/usuarios', UsuarioController.list);
routes.get('/usuarios/:id', UsuarioController.listLogado);
routes.get('/usuariosCel/:celular/:senha', UsuarioController.listCelularUsuario);
routes.post('/usuarios', UsuarioController.create);
routes.patch('/usuarios/:id', UsuarioController.update);

routes.get('/perfil', ProfileController.list);

routes.get('/notificacoes', NotificacoesController.list);

routes.get('/churras', ChurrasController.list);
routes.get('/churras/:usuario_id', ChurrasController.logado);
routes.get('/churraspassados/:usuario_id', ChurrasController.dataPassado);
routes.get('/churrasfuturo/:usuario_id', ChurrasController.dataFuturo);
routes.post('/churras', ChurrasController.create);
routes.delete('/churras/:id', ChurrasController.delete);

routes.get('/item', ItemsController.listAll);
routes.get('/items', ItemsController.listLimit);
routes.get('/listItem',ItemsController.listItensBySubTipo);
routes.post('/item', ItemsController.create);
routes.delete('/item/:id', ItemsController.delete);

routes.get('/pontoCarne', PontoCarneController.list);

routes.get('/listadochurras/:churras_id/', ListaChurrascoController.list);
routes.get('/listadochurras/subTipo/:churras_id/:subTipo', ListaChurrascoController.listSubTipo);
routes.post('/listadochurras', ListaChurrascoController.create);
routes.delete('/listadochurras/:id', ListaChurrascoController.delete);

routes.get('/tipo', TiposController.list);
routes.get('/tipoSubTipo', TiposController.listPorSubTipo);

routes.get('/subtipos', SubTiposController.list);

routes.get('/formatos', FormatosController.list);

routes.get('/unidade', UnidadesController.list);
routes.post('/unidade', UnidadesController.create);

routes.get('/estoque/:usuario_id', EstoqueController.list);

routes.get('/sugestao/:subTipo_id', SugestaoController.list);

routes.get('/quantidadecome', QuantidadeComeController.list);

routes.get('/convidados', ConvidadosController.list);
routes.get('/convidados/:churras_id', ConvidadosController.listChurras);
routes.post('/convidadosChurras/:usuario_id', ConvidadosController.create);





// Rotas para tratamento das fotos itens usuarios churrascos
routes.post('/fotosUsuarios',multer(multerConfigPerfil).single('file'), FotosController.create);

routes.post('/fotosChurras',multer(multerConfigChurrasco).single('file'), FotosController.create);

routes.post('/fotosItens',multer(multerConfigItens).single('file'), FotosController.create);

routes.post('/fotosTipo',multer(multerConfigTipo).single('file'), FotosController.create);

module.exports = routes;