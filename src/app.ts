import express, { Request, Response } from 'express'

//Incializar la aplicación
const app = express()
const port = 3026



//MIDDLEWARE: Permite recibir datos en formato JSON
    app.use(express.json());


//METODOS GET-POST-PUT-DELETE-PATCH    
    app.get ('/hola', (req: Request, res: Response) => {
        res.send('Method Get!')
    })

    
    app.post('/', (req, res)=>{
        console.log(req.body)
        res.send("Method Post")
    })

    
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
} )
