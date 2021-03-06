import { Schema, model } from 'mongoose'

const movimientoSchema = new Schema({
    cantidad: Number,
    fecha: {
        type: Date,
        default: Date.now
    },
    detalle: String,
    tipo: String,
    referencia:
        {
            ref: 'referencias',
            type: Schema.Types.ObjectId
        },
    almacen:
        {
            ref: 'almacenes',
            type: Schema.Types.ObjectId
        }

}, {
    versionKey: false
})

export default model('movimientos', movimientoSchema)