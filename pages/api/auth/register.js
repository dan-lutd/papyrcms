import Mailer from '../../../utilities/mailer'
import mongoose from 'mongoose'
const { user: User } = mongoose.models


const verifyEmailSyntax = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}


export default (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).send({ message: 'Endpoint not found.' })
  }

  if (!res.locals.settings.enableRegistration) {
    return res.status(401).send({ message: 'You\'re not allowed to do that.' })
  }

  const { firstName, lastName, email, password, passwordConfirm } = req.body

  if (!firstName || firstName === '') {
    return res.status(401).send({ message: 'Please enter your first name' })
  }

  if (!lastName || lastName === '') {
    return res.status(401).send({ message: 'Please enter your last name' })
  }

  // Make sure email is in email format
  if (!verifyEmailSyntax(email)) {
    return res.status(401).send({ message: 'Please use a valid email address' })
  }

  // Make sure password fields match
  if (password !== passwordConfirm) {
    return res.status(401).send({ message: 'The password fields need to match' })
  }

  // The LocalStrategy module requires a username
  // Set username and email as the user's email
  const newUser = new User({
    username: email, email, firstName, lastName
  })

  User.register(newUser, password, async err => {

    if (err) {
      err.message = err.message.replace('username', 'email')
      return res.status(401).send({ message: err.message })
    }

    const mailer = new Mailer()
    const subject = `Welcome, ${newUser.firstName}!`

    if (res.locals.settings.enableEmailingToUsers) {
      await mailer.sendEmail(newUser, newUser.email, 'welcome', subject)
    }

    req.login(newUser, err => {
      if (err) {
        return res.status(401).send({ message: err.message })
      }

      return res.send(newUser)
    })
  })
}