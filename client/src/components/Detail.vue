<template>
  <div class="body-background scale-up-ver-top">
    <div class="row" style="margin: 5% 0 0 4.5%;">
      <div class="col s12 m12">
        <div class="card blue-grey darken-4">
          <div class="card-content white-text">
            <div class="row">
              <div class="col">
                <span class="card-title">{{ getQuestion.title }}</span>
                <div class="row">
                  <div class="col">
                    <pre class="card-title" style="font-size:15px; color:#b0bec5">From: {{ getQuestion.UserId.username }}  || </pre>
                  </div>
                  <div class="col">
                    <pre class="card-title" style="font-size:15px; color:#b0bec5;">Email: {{ getQuestion.UserId.email }}</pre>
                  </div>
                </div>
              </div>
              <div class="col right" style="margin: -0.5% 0 0 0">
                <pre style="color:grey;">{{ getQuestion.time }}</pre>
              </div>
            </div>
            <div class="" style="margin: -1% 3% 0 5%;">
              <p v-html='getQuestion.description'></p>
              <br>
            </div>
          </div>
          <div class="row" style="margin: 0 0 0 1%;">
            <div class="col">
              <pre style="color:grey;">Upvotes: {{ getQuestion.votes.length }}</pre>
            </div>
            <div class="col">
              <pre style="color:grey;">Downvotes: {{ getQuestion.downvotes.length }}</pre>
            </div>
          </div>
          <div class="card-action">
            <div class="col" style="margin: 0 0 0 75%;">
              <a class="" title="Upvote this question" style="cursor:pointer; color:#03a9f4;" @click='upVoteQuestion(getQuestion._id)'>
                <i class="fas fa-thumbs-up"> upvote</i>
              </a>
            </div>
            <div class="col">
              <a class="" title="Downvote this question" style="cursor:pointer; color:#03a9f4;" @click='downVoteQuestion(getQuestion._id)'>
                <i class="fas fa-thumbs-down"> downvote</i>
              </a>
            </div>
            <br>
          </div>
          <div class="">
            <div class="card-action">
              <div class="row">
                <br>
                <div class="col s12" v-for=''>
                  <div class="input-field col s12" style="margin: 0 0 0 0;">
                    <textarea id="question" class="materialize-textarea" v-on:keyup.enter='addAnswer(getQuestion._id)' v-model='answer' style="color:white;"></textarea>
                    <label for="question">Enter Answer Here</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="" v-if='getAnswer.length != 0'>
            <div class="card-action">
              <div class="row">
                <h5 style="padding-left:2%; color:white;"> <b>Answer:</b> </h5>
                <br>
                <div class="col s12 m10 right" style="margin-right: 8%;" v-for='answer in getAnswer'>
                  <div class="card grey darken-3">
                    <div class="card-content white-text">
                      <div class="row">
                        <div class="col">
                          <span class="card-title">{{ answer.username }}</span>
                          <pre style="font-size:15px; color:#b0bec5; margin: -4% 0 0 0;" class="card-title">Email: {{ answer.email }}</pre>
                        </div>
                        <div class="col right">
                          <pre style="color:#b0bec5; margin: 3% 0 0 0;">{{ answer.createdAt }}</pre>
                        </div>
                      </div>
                      <p style="margin: 0 0 0 5%;"> <b>" {{ answer.answer }}"</b> </p>
                    </div>
                    <div class="row" style="margin: 0 0 0 1%;">
                      <div class="col">
                        <pre style="color:#b0bec5;">Upvotes: {{ answer.upvotes.length }}</pre>
                      </div>
                      <div class="col">
                        <pre style="color:#b0bec5;">Downvotes: {{ answer.downvotes.length }}</pre>
                      </div>
                    </div>
                    <div class="card-action">
                      <div class="col" style="margin: 0 0 0 68%;">
                        <a class="" title="Upvote this answer" style="cursor:pointer; color:#ffd54f;" @click='upVoteAnswer (answer.UserId, getQuestion._id, answer)'>
                          <i class="fas fa-thumbs-up"> upvote</i>
                        </a>
                      </div>
                      <div class="col">
                        <a class="" title="Downvote this answer" style="cursor:pointer; color:#ffd54f;" @click='downVoteAnswer (answer.UserId, getQuestion._id, answer)'>
                          <i class="fas fa-thumbs-down"> downvote</i>
                        </a>
                      </div>
                      <br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      answer: ''
    }
  },
  created () {
    if (this.$store.state.detail == null) {
      this.$router.push('questions')
    }
  },
  computed : {
    getQuestion () {
      return this.$store.state.detail
    },
    getAnswer () {
      return this.$store.state.answer
    },
    getUpVoteQuestion () {
      return this.$store.state.upVoteQuestion
    },
    getDownVoteQuestion () {
      return this.$store.state.downVoteQuestion
    }
  },
  methods : {
    addAnswer (id) {
      const newAnswer = {
        QuestionId: id,
        answer: this.answer
      }
      this.$store.dispatch('addAnswer', newAnswer)
      this.$store.dispatch('getAllQuestion')
      this.answer = ''
    },
    upVoteQuestion (id) {
      this.$store.dispatch('upVoteQuestion', id)
    },
    downVoteQuestion (id) {
      this.$store.dispatch('downVoteQuestion', id)
    },
    upVoteAnswer (userId, question, answer) {
      if (userId == localStorage.getItem('authorization').split('*#$_.')[1]) {
        swal({
          text: "Oopss.. Dilarang keras Upvote jawaban sendiri !",
          icon: "error",
        });
      } else {
        const data = {
          idQuestion: question,
          answerId: answer._id
        }
        this.$store.dispatch('upVoteAnswer', data)
        this.$store.dispatch('openDetail', question)
        this.$store.dispatch('getAnswer', question._id)
      }
    },
    downVoteAnswer (userId, question, answer) {
      if (userId == localStorage.getItem('authorization').split('*#$_.')[1]) {
        swal({
          text: "Oopss.. Dilarang keras Upvote jawaban sendiri !",
          icon: "error",
        });
      } else {
        const data = {
          idQuestion: question,
          answerId: answer._id
        }
        this.$store.dispatch('downVoteAnswer', data)
        this.$store.dispatch('openDetail', question)
        this.$store.dispatch('getAnswer', question._id)
      }
    }
  }
}
</script>

<style lang="css">
  .body-background{
    text-align: left;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: absolute;
  }
  .scale-up-ver-top {
	-webkit-animation: scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }
  /* ----------------------------------------------
   * Generated by Animista on 2018-7-3 0:55:31
   * w: http://animista.net, t: @cssanimista
   * ---------------------------------------------- */

  /**
   * ----------------------------------------
   * animation scale-up-ver-top
   * ----------------------------------------
   */
  @-webkit-keyframes scale-up-ver-top {
    0% {
      -webkit-transform: scaleY(0.4);
              transform: scaleY(0.4);
      -webkit-transform-origin: 100% 0%;
              transform-origin: 100% 0%;
    }
    100% {
      -webkit-transform: scaleY(1);
              transform: scaleY(1);
      -webkit-transform-origin: 100% 0%;
              transform-origin: 100% 0%;
    }
  }
  @keyframes scale-up-ver-top {
    0% {
      -webkit-transform: scaleY(0.4);
              transform: scaleY(0.4);
      -webkit-transform-origin: 100% 0%;
              transform-origin: 100% 0%;
    }
    100% {
      -webkit-transform: scaleY(1);
              transform: scaleY(1);
      -webkit-transform-origin: 100% 0%;
              transform-origin: 100% 0%;
    }
  }

</style>
