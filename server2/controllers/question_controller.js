const Question = require('../models/questions')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { time } = require('../helpers/getTime');

module.exports = {

  readQuestions(req, res){

    Question.find({}).populate('UserId').exec(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(user)
      }
    });

  },

  addNewQuestion(req, res){
    console.log('add question');
    const token = req.body.token
    const idUser = jwt.decode(token).id.slice(0, token.length-1)
    let newDate = new Date
    const date = String(newDate).slice(0, 15)
    const time = String(newDate).slice(16, 24)
    const now = `${date}, ${time}`

    const newQuestion = {
      title: req.body.title,
      description: req.body.description,
      UserId: idUser,
      time: now
    }

    Question.create(newQuestion, function(err, success) {
      if (err) {
        res.status(404).json('bad request')
      } else {
        res.status(201).json('success add question');
      }
    })

  },

  OpenQuestion(req, res){

    const idQuestion = req.params.id

    Question.findOne({
      _id: idQuestion
    }).populate('userId').exec(function(err, data){
      res.status(200).json(data)
    })

  },

  getDetail(req, res){

    const idQuestion = req.params.id

    Question.find({ _id: idQuestion }).populate('UserId').exec(function(err, user) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(user)
      }
    });

  },

  upvote(req, res){

    const token = req.body.token
    const decoded = jwt.decode(token, "MYSUPERSECRET")
    let voted = true

    console.log('upVoteQuestion');

    Question.find({ _id: req.params.id }).populate('UserId').exec( function (err, data) {
      data[0].votes.forEach(val => {
        if (val == decoded.id) {
          voted = false
        }
      })

      data[0].downvotes.forEach(val => {
        if (val == decoded.id) {
          voted = false
        }
      })

      if (data[0].UserId != decoded.id) {
        if (voted) {
          data[0].votes.push(decoded.id)
          data[0].save()
          res.status(201).json(data)
        } else {
          console.log('dah pernah ngelike');
        }
      }
    })

  },

  downvote(req, res){

    console.log('downVoteQuestion');

    const token = req.body.token
    const decoded = jwt.decode(token, "MYSUPERSECRET")
    let voted = true

    Question.find({ _id: req.params.id }).populate('UserId').exec( function (err, data) {
      data[0].votes.forEach(val => {
        if (val == decoded.id) {
          voted = false
        }
      })

      data[0].downvotes.forEach(val => {
        if (val == decoded.id) {
          voted = false
        }
      })

      if (data[0].UserId != decoded.id) {
        if (voted) {
          data[0].downvotes.push(decoded.id)
          data[0].save()
          res.status(201).json(data)
        } else {
          console.log('dah pernah ngelike');
        }
      }
    })

  },

  answer (req, res) {

    let newDate = new Date
    const date = String(newDate).slice(0, 15)
    const time = String(newDate).slice(16, 24)
    const now = `${date}, ${time}`

    const token = jwt.decode(req.body.token)
    const newAnswer = {
      _id: new mongoose.mongo.ObjectId(),
      username: token.username,
      email: token.email,
      UserId: token.id,
      answer: req.body.comment,
      upvotes: [],
      downvotes: [],
      createdAt: now
    }

    Question.find({ _id: req.body.QuestionId }, (err, data) => {
      data[0].answer.push(newAnswer)
      data[0].save()
      res.status(201).json(data)
    })

  },

  upVoteAnswer (req, res) {
    console.log('upVoteAnswer');
    const decoded = jwt.decode(req.body.token).id
    let votes = null
    let updated = null
    let validation = false

    if (req.body.questionId.idQuestion && req.body.questionId.answerId) {
      Question.find({ _id: req.body.questionId.idQuestion }).populate('UserId').exec( (err, data) => {
        if (err) {
          console.log(err);
        } else {
          for (let i = 0; i < data[0].answer.length; i++) {
            if (data[0].answer[i]._id == req.body.questionId.answerId) {
              console.log('oke check answer id sama');
              if (data[0].answer[i].upvotes.indexOf(decoded) == -1) {
                console.log('oke belo0m pernah ngelike');
                if (data[0].answer[i].UserId != decoded) {
                  console.log('oke bukan yang punya');
                  if (data[0].answer[i].downvotes.indexOf(decoded) == -1) {
                    console.log('oke masuk');
                    validation = true
                    data[0].answer[i].upvotes.push(decoded)
                    votes = data[0].answer.reverse()
                    break;
                  } else {
                    if (err) {
                      console.log(err);
                    }
                    console.log('udah pernah ngedislike');
                    res.status(201).json(data)
                  }
                } else {
                  if (err) {
                    console.log(err);
                  }
                  console.log('komenan sendiri');
                  res.status(201).json(data)
                }
              } else {
                if (err) {
                  console.log(err);
                }
                console.log('udah pernah ngelike');
                res.status(201).json(data)
              }
            }
          }
        }

        if (err) {
          console.log(err);
        } else {
          if (validation == true) {
            Question.update({ _id: req.body.questionId.idQuestion }, { $set: { answer: votes }}, (err, success) => {
              console.log('success update data');
            })
            res.status(201).json(data)
          }
        }

      })

    } else {
      res.status(200).json({ reload: 'reload' })
    }

  },

  downVoteAnswer (req, res) {
    console.log('downvote answer');
    const decoded = jwt.decode(req.body.token).id
    let votes = null
    let updated = null
    let validation = false

    if (req.body.questionId.idQuestion && req.body.questionId.answerId) {
      Question.find({ _id: req.body.questionId.idQuestion }).populate('UserId').exec( (err, data) => {
        if (err) {
          console.log(err);
        } else {
          for (let i = 0; i < data[0].answer.length; i++) {
            if (data[0].answer[i]._id == req.body.questionId.answerId) {
              console.log('oke check answer id sama');
              if (data[0].answer[i].upvotes.indexOf(decoded) == -1) {
                console.log('oke belo0m pernah ngelike');
                if (data[0].answer[i].UserId != decoded) {
                  console.log('oke bukan yang punya');
                  if (data[0].answer[i].downvotes.indexOf(decoded) == -1) {
                    console.log('oke masuk');
                    validation = true
                    data[0].answer[i].downvotes.push(decoded)
                    votes = data[0].answer.reverse()
                    break;
                  } else {
                    if (err) {
                      console.log(err);
                    }
                    console.log('udah pernah ngedislike');
                    res.status(201).json(data)
                  }
                } else {
                  if (err) {
                    console.log(err);
                  }
                  console.log('komenan sendiri');
                  res.status(201).json(data)
                }
              } else {
                if (err) {
                  console.log(err);
                }
                console.log('udah pernah ngelike');
                res.status(201).json(data)
              }
            }
          }
        }

        if (err) {
          console.log(err);
        } else {
          if (validation == true) {
            Question.update({ _id: req.body.questionId.idQuestion }, { $set: { answer: votes }}, (err, success) => {
              console.log('success update data');
            })
            res.status(201).json(data)
          }
        }

      })

    } else {
      res.status(200).json({ reload: 'reload' })
    }

  },

  DeleteQuestion (req, res) {
    Question.findOneAndRemove({ _id: req.params.id }, (err, response) => {
      res.status(201).json(response)
    })
  }

};
