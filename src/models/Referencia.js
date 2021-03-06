import { Schema, model } from 'mongoose'

const referenciaSchema = new Schema({
    libro: {
        ref: 'libros',
        type: Schema.Types.ObjectId
    },
    nombre: String,
    precioCosto: Number
}, {
    versionKey: false
})

export default model('referencias', referenciaSchema)