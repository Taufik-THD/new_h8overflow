// const Question = require('../models/questions')
// const User = require('../models/user')
// const Answer = require('../models/answer')
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
//
// module.exports = {
//
//   getComment(req, res){
//     // console.log(req.params.id);
//     // Answer.find({ QuestionId: '5b07dc1f9996750b6e84d83e' }, (err, data) => {
//     //   console.log(data);
//     // })
//     Answer.find({
//       QuestionId: req.params.id
//     }).populate('UserId').exec().then(data => {
//       console.log(data);
//       // res.status(200).json({ data })
//     })
//   },
//
//   addComment(req, res){
//
//     const token = req.body.token
//     const UserId = jwt.decode(token)
//
//     const newComment = {
//       QuestionId: req.params.id,
//       comment: req.body.comment,
//       UserId
//     }
//
//     Answer.create(newComment, function (err, success) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.status(201).json("success")
//       }
//     })
//
//   }
//
// };
