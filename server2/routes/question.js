var express = require('express');
var router = express.Router();
const {
        readQuestions,
        addNewQuestion,
        OpenQuestion,
        getDetail,
        upvote,
        downvote,
        answer,
        upVoteAnswer,
        downVoteAnswer,
        DeleteQuestion
      } = require('../controllers/question_controller');

router.post('/', readQuestions)

router.post('/add', addNewQuestion)

router.get('/:id', OpenQuestion)

router.get('/detail/:id', getDetail)

router.post('/detail/upvote/:id', upvote)

router.post('/detail/downvote/:id', downvote)

router.post('/detail/answer', answer)

router.post('/detail/upvoteanswer/:id', upVoteAnswer)

router.post('/detail/downvoteanswer/:id', downVoteAnswer)

router.delete('/:id', DeleteQuestion)

module.exports = router;
