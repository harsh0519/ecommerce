import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service : 'gmail',
    secure : true,
    auth : {
        user : 'vijayeswarybe@gmail.com',
        pass : 'fhqyirzgxaznsliq'
    },
    tls : {
        rejectUnauthorized : false
    }
})

const userToAdminEmailService = async(to) => {
    try {
        let mailContent = await transporter.sendMail({
            from : 'vijayeswarybe@gmail.com',
            to : to,
            subject : 'Connect with FarmKettle!!!',
            html : `<div>
              <p>Hi Sir/Mam, <br><br>
                Thanks for reaching out. We will get back to you as soon to discuss more on your query<br><br>
                With Regards, <br>
                FarmKettle </p>
            </div>`
        })
    } catch (error) {
        throw "something went wrong in submiting request"
    }
}

export default userToAdminEmailService