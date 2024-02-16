const nodemailer = require("nodemailer");
const {users} = require('./server')

async function main() {
   let testAccount = await nodemailer.createTestAccount();
   let transporter = nodemailer.createTransport({
      host: "smtp.anish.email",
      port: 587,
      secure: false, 
      auth: {
         user: testAccount.user, 
         pass: testAccount.pass 
      }
   });

   let info = await transporter.sendMail({
      from: `anishanish8409@gmail.com`, 
      to: `${users[0].email}`, 
      subject: ` SUGGESTION    `, 
      text: ` ${users[0].message}    `, 
      html: `<b> ${users[0].message}  </b>` 
   });

   console.log("Message sent: %s", info.messageId);
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
   main
}
