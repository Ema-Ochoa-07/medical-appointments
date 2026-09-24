import * as XLSX from 'xlsx'
import { CustomError } from '../domain'

export const readExcel = (buffer: Buffer) => {

    //Aquí se lee el contenido(buffer) y se convierte en una estructura que se pueda trabajar
    const workbook = XLSX.read(buffer, {
        type: 'buffer'
    })

    //Obtenemos el nombre de la primera hoja del documento
    const nombreHoja = workbook.SheetNames[0]

    //Comprobamos que el archivo tenga al menos una hoja
    if(!nombreHoja){
        throw CustomError.notFound('El archivo Excel o CSV no contiene ninguna hoja')
    }

    //En este punto obtenemos el contenido de esa hoja
    const hoja = workbook.Sheets[nombreHoja]

    //Convertimos el contenido de la hoja en un arreglo de objetos
    const filas = XLSX.utils.sheet_to_json(hoja!)

    if(filas.length === 0){
        throw CustomError.notFound('El archivo Excel o CSV está vacío')
}

    return filas
}