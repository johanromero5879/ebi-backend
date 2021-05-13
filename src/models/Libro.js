import { Schema, model } from 'mongoose'

const libroSchema = new Schema({
    isbn: String,
    titulo: String,
    autor: String,
    categoria: String,
    tema: String,
    anio: Number,
    editoral: [
        {
            ref: 'editoriales',
            type: Schema.Types.ObjectId
        }
    ]
}, {
    versionKey: false
})

export default model('libros', libroSchema)