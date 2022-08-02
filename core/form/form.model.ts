import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({

  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  questions: [
    {
      body: {
        type: String,
        required: true
      },

      number: {
        type: Number,
        required: true
      },

      answers: [
        {
          body: {
            type: String,
            required: true
          },

          number: {
            type: Number,
            required: true
          }
        }
      ]
    }
  ]

})

export default mongoose.model('Form', schema)