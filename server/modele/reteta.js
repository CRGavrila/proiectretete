const mongoose = require('mongoose');

const retetaSchema = mongoose.Schema({
    _uuid:{
        type:String,
        required:true,
        unique:1
    },
    titlu_reteta:{
        type:String,
        default:'n/a',
        maxlength: 255
    },
    descriere_reteta:{
        type:String,
        default:'n/a',
        maxlength: 2000
    },
    ingrediente_reteta: {
        type:Array,
        default:[]
    },
    imagine: {
        type:String,
        default:'n/a',
    }
});

const Reteta = mongoose.model('Reteta',retetaSchema );

module.exports = { Reteta }