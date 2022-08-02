import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({

  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },

  token: {
    type: String,
    required: true
  }

})

export default mongoose.model('Token', schema)