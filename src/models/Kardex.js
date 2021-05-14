import { Schema, model } from 'mongoose'

const kardexSchema = new Schema({
    fecha: Date,
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
    versionKey: false
})

export default model('kardex', kardexSchema)