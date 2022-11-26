const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passageiroSchema = Schema({
    codigo: Number,
    cpf : Number,
    nome: String,
    datanasc : Date,
    email : String
})

module.exports = mongoose.model("Passageiro", passageiroSchema);