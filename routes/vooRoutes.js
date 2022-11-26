const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");
const vooController = require("../controllers/vooController");

routes.get("/voo", auth, vooController.listar);
routes.get("/voo/relatorio", auth, vooController.relatorio);
routes.post("/voo", auth, vooController.cadastrarPost);
routes.get("/voo/cadastrar/:numero?", auth, vooController.cadastrarGet);
routes.get("/voo/:numero", auth, vooController.detalhar);
routes.get("/voo/remover/:numero", auth, vooController.remover);

module.exports = routes;