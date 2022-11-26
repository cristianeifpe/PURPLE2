const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vooSchema = Schema({
    numero : Number,
    saida: String,
    datasaida : Date,
    horasaida : String,
    destino : String,
    datapouso : Date,
    horapouso : String,
    aviao : String
})

module.exports = mongoose.model("Voo", vooSchema);