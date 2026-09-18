import multer from 'multer'

const volatile_Storage = multer.memoryStorage()

const upload = multer({storage: volatile_Storage})

export const  uploadSingle = (file: string) =>{
    return upload.single(file)
}

export const uploadArr = (files: string, maxFileNumber: number) =>{
   return upload.array(files, maxFileNumber) 
}