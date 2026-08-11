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

    
    app.post('/', (req: Request, res: Response)=>{
        console.log(req.body)
        res.json({
            message: 'El especialista fue creado satisfactoriamente',
            data:req.body
        })
    })


    app.get('/:id',(req, res) =>{

        const {id} = req.params        

        res.json({
            message: 'Especialista encontrado',
            id: id
        })
    })



    
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
} )
