const query = require('../querys/query')
const db = require('../config/db')
const nodemailer = require('nodemailer')

const getStudents = async (req, res) => {
  try {
    const students = await db.query(query.getStudents)
    res.json({ data: students.rows, msg: 'users success found' })
  } catch (err) {
    res.status(500).json(err)
  }
}

const getStudentById = async (req, res) => {
  try {
    const student = await db.query(query.getStudentById, [req.params.id])
    res.json({ data: student.rows[0], msg: 'user has been found' })
  } catch (err) {
    res.status(500).json(err)
  }
}

const addStudent = async (req, res) => {
  try {
    const { name, email, age, dob } = req.body

    const userExsists = await db.query(query.verifyStudentEmail, [email])
    !userExsists && res.status(409).json('User already exsists')

    // const students = await db.query(query.addStudent, [name, email, age, dob])

    const transporter = nodemailer.createTransport(
      {
        pool: true,
        maxConnections: 8,
        socketTimeout: 1000000,
        maxMessages: 'infinity',
        rateLimit: 2, 
        rateDalta: 20000, 
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: 'rybak.nekyadnex.ru@gmail.com',
          pass: 'jnhf nmxp malz rfsr', 
          accessToken: 'ya29.A0ARrdaM9DxCFqMdZ0aC5W3c-b12bNwDkGyynos4dG2iQQY41WrMSZTTq6tw0cL7_GKSJZJcdr0ejhb-13uB0ipkeJvN1hSf73E9TpJ15H30IvG-lNVrhJTcBuZPDtZFfhgTdU5G0oi4A5F6Dd_GAgkAe_byGp',
          refreshToken: '1//047wimKEVgjvGCgYIARAAGAQSNwF-L9IrEzhJZ1Ym5fw7vf4-RB7LqaE92iyzuPk4zHEkykCVcLYn19zmHm3HnPn9ihh3L2-VSyI',
          expires: 1650202360820 * 60000 * 36000,
          clientId: '790599578072-oj6it6f70edgo9idn0p8f7hgh7ksj67l.apps.googleusercontent.com',
          clientSecret: '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',
          accessUrl: 'https://oauth2.googleapis.com/token',
        },
      } 
    )
    
    const result = await transporter.sendMail({
      from: 'Nikita Rybak <rybak.nekyadnex.ru@gmail.com>',
      to: `${email}`,
      subject: 'Message from Node js',
      text: `Hello ${name}!`,
      html:
        '<h1>Today is your <strong>birthday</strong></h1>',
    })

    console.log(result)

    res.status(201).json({ data: students, msg: 'User success created' })
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteStudent = async (req, res) => {
  try {
    await db.query(query.deleteStudent, [req.params.id])
    res.json({ msg: 'user has been deleted...' })
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body
    await db.query(query.updateUser, [name, email, age, req.params.id])
    const updatedUser = await db.query(query.getStudentById, [req.params.id])
    res.status(201).json({ data: updatedUser.rows[0], msg: 'user has been updated...' })
  } catch (err) {
    res.status(500).json(err)
  }
}


module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent
}