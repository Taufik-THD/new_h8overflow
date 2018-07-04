const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  QuestionId: { type:String, ref: 'Question' },
  UserId: { type:String, ref: 'User' },
  comment: { type:String }
},{
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;
