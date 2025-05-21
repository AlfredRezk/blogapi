const { model, Schema } = require('mongoose')
const { genSalt, hash, compare } = require('bcryptjs')
const passwordEncrypt = require('../utils/passwordEncrypt')

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // required: true,
    required: [true, 'Email is required'],
    // unique: true,
    unique: [true, 'Email already exists'],
    trim: true,
    // validate: [(email)=>{
    //     if(email.includes('@') && email.includes('.')) return true
    //     else return false
    // }, 'Email is invalid']
    // validate: [(email)=>email.includes('@') && email.includes('.'), 'Email is invalid'],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi, 'Email is invalid!'],
  },
  password: {
    type: String,
    trim: true,
    required: true,
    // set: (password) => passwordEncrypt(password),
    // set: (password) => hashSync(password, 12),
    // select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
})

// userSchema.path('email').validate(async (email) =>
//     /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(email),
// 'Email already exists')

userSchema.pre('save', async function (next) {
  // Encrypt password
  const salt = await genSalt(12)
  // const hashedPassword = await hash(this.password, salt)
  // this.password = hashedPassword
  this.password = await hash(this.password, salt)
  next()
})

// userSchema.pre('save', async function (next) {
//   this.password = passwordEncrypt(this.password)
// })

// Adding custome methods
userSchema.methods.checkPassword = async function (password) {
  return await compare(password, this.password)
}

module.exports = model('User', userSchema)
