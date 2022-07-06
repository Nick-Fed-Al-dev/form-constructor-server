import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  secondName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
  },

  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('User', schema)