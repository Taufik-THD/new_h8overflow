// const Fb = require('../models/facebook')
// const Github = require('../models/github')
// const Google = require('../models/google')
// const Steam = require('../models/steam')
// const todo = require('../models/todo')
// const jwt = require('jsonwebtoken')
//
module.exports = {
  LoginGoogle(req, res){
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.google_id
    }
    console.log(userData);
//     Google.find({ email: userData.email }, (err, data) => {
//       if (data.length != 0) {
//         data[0].comparePassword(userData.password, function(err, isMatch) {
//
//           if (err) {
//             res.status(404).json(err)
//           } else {
//
//             if (!isMatch) {
//
//               res.status(400).json('wrong password')
//
//             } else {
//
//               const jwtToken = jwt.sign({ email: userData.email, id: data[0]._id }, 'MYSUPERSECRET')
//               res.status(200).json({ jwtToken })
//
//             }
//
//           }
//
//         })
//       } else {
//
//         Google.create(userData, (err, data) => {
//
//           const jwtToken = jwt.sign({ email: userData.email, id: data._id }, 'MYSUPERSECRET')
//           res.status(201).json({ jwtToken })
//
//         })
//
//       }
//
//     })
//
  },
  LoginGithub(req, res){
    const userData = {
      username: req.body.user_name,
      email: req.body.user_email,
      password: req.body.user_id
    }
    console.log(userData);
//     Github.find({ email: userData.email }, (err, data) => {
//       if (data.length != 0) {
//         data[0].comparePassword(userData.password, function(err, isMatch) {
//
//           if (err) {
//             res.status(404).json(err)
//           } else {
//
//             if (!isMatch) {
//
//               res.status(400).json('wrong password')
//
//             } else {
//
//               const jwtToken = jwt.sign({ email: userData.email, id: data[0]._id }, 'MYSUPERSECRET')
//               res.status(200).json({ jwtToken })
//
//             }
//
//           }
//
//         })
//       } else {
//
//         Github.create(userData, (err, data) => {
//
//           const jwtToken = jwt.sign({ email: userData.email, id: data._id }, 'MYSUPERSECRET')
//           res.status(201).json({ jwtToken })
//
//         })
//
//       }
//
//     })
  },
  Loginfb(req, res){
    const userData = {
      username: req.headers.name,
      email: req.headers.email,
      password: req.headers.id
    }
    console.log(userData);
//     Fb.find({ email: userData.email }, (err, data) => {
//       if (data.length != 0) {
//         data[0].comparePassword(userData.password, function(err, isMatch) {
//
//           if (err) {
//             res.status(404).json(err)
//           } else {
//
//             if (!isMatch) {
//
//               res.status(400).json('wrong password')
//
//             } else {
//
//               const jwtToken = jwt.sign({ email: userData.email, id: data[0]._id }, 'MYSUPERSECRET')
//               res.status(200).json({ jwtToken })
//
//             }
//
//           }
//
//         })
//       } else {
//
//         Fb.create(userData, (err, data) => {
//
//           const jwtToken = jwt.sign({ email: userData.email, id: data._id }, 'MYSUPERSECRET')
//           res.status(201).json({ jwtToken })
//
//         })
//
//       }
//
//     })
  },
//   LoginSteam(req, res){
//     const userData = {
//       username: req.user.username,
//       email: req.user.username,
//       password: req.user.steamid
//     }
//
//     console.log('login steam');
//
//     Steam.find({ email: userData.email }, (err, data) => {
//       if (data.length != 0) {
//         data[0].comparePassword(userData.password, function(err, isMatch) {
//
//           if (err) {
//             res.status(404).json(err)
//           } else {
//
//             if (!isMatch) {
//
//               res.status(400).json('wrong password')
//
//             } else {
//
//               const jwtToken = jwt.sign({ email: userData.email, id: data[0]._id }, 'MYSUPERSECRET')
//               res.status(200).json({ jwtToken })
//
//             }
//
//           }
//
//         })
//       } else {
//
//         Steam.create(userData, (err, data) => {
//
//           const jwtToken = jwt.sign({ email: userData.email, id: data._id }, 'MYSUPERSECRET')
//           res.status(201).json({ jwtToken })
//           console.log(data[0]._id);
//
//         })
//
//       }
//
//     })
//   }
}
