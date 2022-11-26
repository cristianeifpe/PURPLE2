// aqui ficam as funções

const PassageiroModel = require("../models/PassageiroModel");

class PassageiroController{

    static async relatorio(req, res){
        const listaPassageiro = await PassageiroModel.find();
        res.render("passageiro/relatorio", {listaPassageiro});
    }

    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const atualizado = req.query.a;
        const listaPassageiro = await PassageiroModel.find();
        res.render("passageiro/listar", {listaPassageiro, salvo, removido, atualizado});
    };

    static async cadastrarGet(req, res){
        const cod = req.params.codigo;
        let passageiro = {};
        let escondido = "";
        if (cod){
            passageiro = await PassageiroModel.findOne({codigo: cod});
            escondido = "hidden";
        }
        res.render("passageiro/cadastrar", {passageiro, escondido});
    };

    static async cadastrarPost(req, res){
        const passageiro = req.body;
        if (passageiro.id){
            await PassageiroModel.findOneAndUpdate({codigo: passageiro.codigo},
            {
                nome: passageiro.nome,
                datanasc: passageiro.datanasc,
                email: passageiro.email,
                cpf: passageiro.cpf
            });
            res.redirect("/passageiro?a=1");

        } else{
            const novoPassageiro = new PassageiroModel({
                codigo: passageiro.codigo,
                nome: passageiro.nome,
                datanasc: passageiro.datanasc,
                email: passageiro.email,
                cpf: passageiro.cpf
            })
            await novoPassageiro.save();
            res.redirect("/passageiro?s=1");
        }

    };

    static async detalhar(req, res){
        const cod = req.params.codigo;
        const resultado = await PassageiroModel.findOne({codigo: cod});
        res.render("passageiro/detalhar", {resultado});
    };

    static async remover(req,res){
        const cod = req.params.codigo;
        await PassageiroModel.findOneAndDelete({codigo: cod});
        res.redirect("/passageiro?r=1");
    };

}

module.exports = PassageiroController;