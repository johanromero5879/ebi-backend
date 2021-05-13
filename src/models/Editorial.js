import { Schema, model } from 'mongoose'

const editorialSchema = new Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    correo: String
}, {
    versionKey: false
})

export default model('editoriales', editorialSchema)