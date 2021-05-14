import { Schema, model } from 'mongoose'

const inventariosSchema = new Schema({
    cantidad: Number,
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