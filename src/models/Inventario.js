import { Schema, model } from 'mongoose'

const inventariosSchema = new Schema({
    cantidad: {
        type: Number,
        default: 0
    },
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

export default model('inventarios', inventariosSchema)