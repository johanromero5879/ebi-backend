import { Schema, model } from 'mongoose'

const inventariosSchema = new Schema({
    cantidad: Number,
    libro:
        {
            ref: 'libros',
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