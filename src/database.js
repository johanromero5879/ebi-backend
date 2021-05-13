import mongoose from "mongoose"

const connect = async () => {
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("DB is connected on:", process.env.DB_URL)
    }catch(ex){
        throw "DB could not be connected"
    }
}

connect()