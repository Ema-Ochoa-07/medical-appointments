import multer from 'multer'

const volatile_Storage = multer.memoryStorage()

const uploadImg = multer({
    storage: volatile_Storage,
    fileFilter: (request, file, cb) => {

        if (file.mimetype == "image/png" ||file.mimetype == "image/jpg" ||file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error('Error!! el formato de la imagen no es compatible'))
        }
    }
})

export const uploadSingle = (file: string) => {
    return uploadImg.single(file)
}

export const uploadArr = (files: string, maxFileNumber: number) => {
    return uploadImg.array(files, maxFileNumber)
}