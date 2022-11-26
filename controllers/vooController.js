// aqui ficam as funções

const VooModel = require("../models/VooModel");

class VooController{

    static async relatorio(req, res){
        const listaVoo = await VooModel.find();
        res.render("voo/relatorio", {listaVoo});
    }

    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const atualizado = req.query.a;
        const listaVoo = await VooModel.find();
        res.render("voo/listar", {listaVoo, salvo, removido, atualizado});
    };

    static async cadastrarGet(req, res){
        const cod = req.params.numero;
        let voo = {};
        let escondido = "";
        if (cod){
            voo = await VooModel.findOne({numero: cod});
            escondido = "hidden";
        }
        res.render("voo/cadastrar", {voo, escondido});
    };

    static async cadastrarPost(req, res){
        const voo = req.body;
        if (voo.id){
            await VooModel.findOneAndUpdate({numero: voo.numero},
            {
                saida: voo.saida,
                datasaida: voo.datasaida,
                horasaida: voo.horasaida,
                destino: voo.destino,
                datapouso: voo.datapouso,
                horapouso: voo.horapouso,
                aviao: voo.aviao

            });
            res.redirect("/voo?a=1");

        } else{
            const novoVoo = new VooModel({
                numero: voo.numero,
                saida: voo.saida,
                datasaida: voo.datasaida,
                horasaida: voo.horasaida,
                destino: voo.destino,
                datapouso: voo.datapouso,
                horapouso: voo.horapouso,
                aviao: voo.aviao
            })
            await novoVoo.save();
            res.redirect("/voo?s=1");
        }

    };

    static async detalhar(req, res){
        const cod = req.params.numero;
        const resultado = await VooModel.findOne({numero: cod});
        res.render("voo/detalhar", {resultado});
    };

    static async remover(req,res){
        const cod = req.params.numero;
        await VooModel.findOneAndDelete({numero: cod});
        res.redirect("/voo?r=1");
    };

}

module.exports = VooController;