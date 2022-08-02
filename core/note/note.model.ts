import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({

  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },

  form: {
    type: mongoose.Types.ObjectId,
    required: true
  },

  answers: [{

    questionNumber: {
      type: Number,
      required: true
    },

    answerNumber: {
      type: Number,
      required: true
    }

  }]
})

export default mongoose.model('Note', schema)