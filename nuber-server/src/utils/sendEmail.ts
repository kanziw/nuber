import Mailgun from 'mailgun-js'

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: 'sandbox7f9c46336f77482eb6b64c5de2a6ad98.mailgun.org',
})

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'kanziwoong@gmail.com',
    to: 'kanziwoong@gmail.com',
    subject,
    html,
  }
  return mailGunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`
  const emailBody = `Verify your email by clicking <a href="http://kanziw.com/verification/${key}/">here</a>`
  return sendEmail(emailSubject, emailBody)
}
