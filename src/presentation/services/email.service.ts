import nodemailer, { Transporter } from "nodemailer";


export interface SendEmailOPtions {
    to:string | string []
    subject: string
    htmlBody: string
    attachments?: Attachment[]
}

interface Attachment{
    filename: string
    path: string
}

export class EmailService{
    private transporter: Transporter


    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string,
        private readonly postToProvider: boolean
    ){
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword
            }
        })
    }


    async sendEmail ( options: SendEmailOPtions){
        const { to, subject, htmlBody, attachments = [] } = options
        
        //CONTROLA CUANDO ENVIAR O NO CORREOS ELECTRÓNICOS
        if( this.postToProvider == false) return true

        try {
            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })
            return true
        } catch (error) {
            console.log(error)
             return false
        }
    }

}