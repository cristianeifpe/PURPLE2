// aqui ficam as funções

const UsuarioModel = require("../models/UsuarioModel");
const  bcrypt = require ("bcryptjs");

class UsuarioController{

    static async relatorio(req, res){
        const listaUsuario = await UsuarioModel.find();
        res.render("usuario/relatorio", {listaUsuario});
    }

    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const atualizado = req.query.a;
        const listaUsuario = await UsuarioModel.find();
        res.render("usuario/listar", {listaUsuario, salvo, removido, atualizado});
    };

    static async cadastrarGet(req, res){
        const email = req.params.email;
        const erro = req.query.e;
        let usuario = {};
        let escondido = "";
        if (email){
            usuario = await UsuarioModel.findOne({email: email});
            escondido = "hidden";
        }
        res.render("usuario/cadastrar", {usuario, escondido, erro});
    };

    static async cadastrarPost(req, res){
        const usuario = req.body;
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(usuario.senha, salt);
        console.log(1);
        if (usuario.id){
            await UsuarioModel.findOneAndUpdate({email: usuario.email},
            {
                nome: usuario.nome,
                senha: hash
            });
            console.log(2);
            res.redirect("/usuario?a=1");

        } else{
            const email = await UsuarioModel.findOne({email: usuario.email});
            console.log(3);
            if(email){
                res.redirect("/usuario/cadastrar?e=1")
                console.log(4);
            } else{
                const novoUsuario = new UsuarioModel({
                    email: usuario.email,
                    nome: usuario.nome,
                    senha: hash
                })
                await novoUsuario.save();
                console.log(5);
                res.redirect("/usuario?s=1");
            }
        }

    };

    static async detalhar(req, res){
        const email = req.params.email;
        const resultado = await UsuarioModel.findOne({email: email});
        res.render("usuario/detalhar", {resultado});
    };

    static async remover(req, res){
        const email = req.params.email;
        await UsuarioModel.findOneAndDelete({email: email});
        res.redirect("/usuario?r=1");
    };

    static async loginGet(req, res){
        if(req.session.usuario){
            res.redirect("/");
        }else{
            const erro = req.query.e;
            res.render("usuario/login", {erro});
        }
    };

    static async loginPost(req, res){
        const usuario = req.body;
        const resultado = await UsuarioModel.findOne({email: usuario.email});
        if (resultado){
            if (bcrypt.compareSync(usuario.senha, resultado.senha)){
                req.session.usuario = resultado.email;
                res.redirect("/");
            } else{
                res.send("Dados incorretos! Tente novamente.");
            }
        }else{
            res.send("Dados incorretos! Tente novamente.");
        }
    }

    static async logout(req, res){
        req.session.usuario = undefined;
        res.redirect("/usuario/login");
    }

}

module.exports = UsuarioController;