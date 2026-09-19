import multer from 'multer'

const volatile_Storage = multer.memoryStorage()

const uploadExcel = multer({
    storage: volatile_Storage,
    fileFilter: (request, file, cb) => {

        if (
            file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.mimetype === "application/vnd.ms-excel" ||
            file.mimetype === "text/csv"
        ) {
            cb(null, true)

        } else {
            cb(new Error('Error!! el formato del archivo no es compatible'))
        }

    }
})

export const uploadSingle = (file: string) => {
    return uploadExcel.single(file)
}