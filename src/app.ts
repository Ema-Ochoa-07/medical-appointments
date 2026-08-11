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

    /* VARIOS PARÁMETROS
    CUANDO VA EL : Significa que parámetro es variable
    SI NO VA EL : El parámetro que esé es fijo

    app.get('/:id/name/:edad',(req, res) =>{

        const {id, name, edad} = req.params        

        res.json({
            message: 'Especialista encontrado',
            id: id,
            name: name,
            edad: edad
        })
    })

    */

    app.patch('/:id',(req: Request, res: Response) =>{
        const { id } = req.params 
        res.json({
            message:'El especialista se actualizó correctamente',
            data: req.body
        })
    })

     app.delete('/:id',(req: Request, res: Response) =>{
        const { id } = req.params 
        res.json({
            message:'El especialista se eliminó correctamente',
            data: req.body
        })
    })



    
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
} )
