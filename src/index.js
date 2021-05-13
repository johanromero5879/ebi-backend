import app from './app'
import './database'

try{
    app.listen(app.get('port'))
    console.log(`Servidor conectado en el puerto ${app.get('port')}`)
}catch(ex){
    console.error(ex.message)
}
