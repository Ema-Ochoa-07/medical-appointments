import express, { Request, Response } from 'express'

//Incializar la aplicación
const app = express()
const port = 3026

    app.get ('/hola', (req: Request, res: Response) => {
        res.send('Hola Mundo!')
    })


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
} )
