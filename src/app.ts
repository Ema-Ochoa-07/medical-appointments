import express from 'express'

//Incializar la aplicación
const app = express()
const port = 3026


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
} )
