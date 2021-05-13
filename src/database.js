import mongoose from "mongoose"

const connect = async () => {
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("Base de datos conectada")
    }catch(ex){
        throw "La base de datos no se pudo conectar"
    }
}

connect()