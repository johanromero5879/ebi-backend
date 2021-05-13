import { Schema, model } from 'mongoose'

const almacenSchema = new Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    correo: String
}, {
    versionKey: false
})

export default model('almacenes', almacenSchema)