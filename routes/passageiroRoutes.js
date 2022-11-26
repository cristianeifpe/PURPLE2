const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");
const passageiroController = require("../controllers/passageiroController");

routes.get("/passageiro", auth, passageiroController.listar);
routes.get("/passageiro/relatorio", auth, passageiroController.relatorio);
routes.post("/passageiro", auth, passageiroController.cadastrarPost);
routes.get("/passageiro/cadastrar/:codigo?", auth, passageiroController.cadastrarGet);
routes.get("/passageiro/:codigo", auth, passageiroController.detalhar);
routes.get("/passageiro/remover/:codigo", auth, passageiroController.remover);

module.exports = routes;