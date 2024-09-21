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

const adminToEmpEmailService = async(name,email,mobile,description) => {
    try {
        let mailContent = await transporter.sendMail({
            from : 'vijayeswarybe@gmail.com',
            to : 'vijayeswar_y@yahoo.com',
            subject : `Query from the user `,
            html : `<div>
              <p>Hi Vijayeswar <br><br>
                <b>${name}</b> have reached us with a Query<br></p>
                <p><b>Query  :</b> ${description}</p>
                <h4>Contact details</h4>
                <p><i>Mobile  :</i> ${mobile}</p>
                <p><i>email  :</i> ${email}</p><br><br>
                <p>With Regards, <br>
                FarmKettle </p>
            </div>`
        })
    } catch (error) {
        throw "something went wrong in submiting request"
    }
}

export default adminToEmpEmailService