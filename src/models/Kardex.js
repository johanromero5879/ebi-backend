import { Schema, model } from 'mongoose'

const kardexSchema = new Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    fechaAnterior: {
        type: Date,
        default: Date.now
    },
    valorInicial: Number,
    cantidadInicial: Number,
    valorFinal: Number,
    cantidadFinal: Number,
    movimientos: [
        {
            ref: 'movimientos',
            type: Schema.Types.ObjectId
        }
    ],
    almacen: {
        ref: 'almacenes',
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    collection: 'kardex'
})

export default model('kardex', kardexSchema)