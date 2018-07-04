import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formLogin: false,
    formRegister: false,
    questions: null,
    detail: null,
    answer: [],
    upVoteQuestion: [],
    downVoteQuestion: [],
    userData: null,
    backup: null,
    profile: null
  },
  mutations: {
    closeLoginForm (state, close) {
      state.formLogin = false
    },
    openLoginForm (state, close) {
      state.formLogin = true
    },
    openRegisterForm (state, openRegister) {
      state.formRegister = true
    },
    closeRegisterForm (state, closeRegister) {
      state.formRegister = false
    },
    allQuestion (state, getAllQuestion) {
      state.questions = getAllQuestion.reverse()
    },
    detail (state, openDetail) {
      state.backup = openDetail
      state.detail = openDetail
      state.answer = openDetail.answer.reverse()
      state.upVoteQuestion = openDetail.votes
      state.downVoteQuestion = openDetail.downvotes
    },
    answer (state, addAnswer) {
      state.answer = addAnswer.reverse()
    },
    upQuestion (state, upVoteQuestion) {
      state.upVoteQuestion = upVoteQuestion
    },
    downQuestion (state, downVoteQuestion) {
      state.downVoteQuestion = downVoteQuestion
    },
    userdata (state, UserData) {
      state.userData = UserData
    },
    profile (state, profileInfo) {
      state.profile = profileInfo
    }
  },
  actions: {
    close ({ commit }, payload) {
      commit('closeLoginForm')
    },
    open ({ commit }, payload) {
      commit('openLoginForm')
    },
    openRegister ({ commit }, payload) {
      commit('openRegisterForm')
    },
    closeRegister ({ commit }, payload) {
      commit('closeRegisterForm')
    },
    getAllQuestion ({ commit }, payload) {
      const token = localStorage.getItem('authorization').split('*#$_.')[0]
      axios({
        method: 'post',
        url: 'http://localhost:3000/question/'
      }).then(dataQuestion => {
        commit('allQuestion', dataQuestion.data)
      }).catch(err => {
        console.log(err);
      })
    },
    openDetail ({ commit }, payload) {
      commit('detail', payload)
    },
    getAnswer ({ commit }, payload) {
      axios({
        method: 'get',
        url: `http://localhost:3000/answer/${payload}`
      }).then(response => {
        console.log("response");
      }).catch(err => {
        console.log(err);
      })
    },
    addAnswer ({ commit }, payload) {
      const token = localStorage.getItem('authorization').split('*#$_.')[0]
      axios({
        method: 'post',
        url: `http://localhost:3000/question/detail/answer`,
        data: {
          QuestionId: payload.QuestionId,
          comment: payload.answer,
          token: token
        }
      }).then(response => {
        commit('answer', response.data[0].answer)
      }).catch(err => {
        console.log(err);
      })
    },
    upVoteQuestion ({ commit }, payload) {
      if (String(this.state.userData) == String(this.state.detail.UserId._id)) {
        swal({
          text: "Oopss.. Dilarang keras Upvote pertanyaan sendiri !",
          icon: "error",
        });
      } else {
        const token = localStorage.getItem('authorization').split('*#$_.')[0]
        axios({
          method: 'post',
          url: `http://localhost:3000/question/detail/upvote/${payload}`,
          data: {
            token: token
          }
        }).then(response => {
          commit('answer', response.data[0].answer)
          commit('upQuestion', response.data[0].votes)
          commit('detail', response.data[0])
        }).catch(err => {
          console.log(err);
        })
      }
    },
    downVoteQuestion ({ commit }, payload) {
      if (String(this.state.userData) == String(this.state.detail.UserId._id)) {
        swal({
          text: "Oopss.. Dilarang keras Downvote pertanyaan sendiri !",
          icon: "error",
        });
      } else {
        const token = localStorage.getItem('authorization').split('*#$_.')[0]
        axios({
          method: 'post',
          url: `http://localhost:3000/question/detail/downvote/${payload}`,
          data: {
            token: token
          }
        }).then(response => {
          commit('answer', response.data[0].answer)
          commit('detail', response.data[0])
          commit('downQuestion', response.data[0].downvotes)
        }).catch(err => {
          console.log(err);
        })
      }
    },
    upVoteAnswer ({ commit }, payload) {
      const token = localStorage.getItem('authorization').split('*#$_.')[0]
      axios({
        method: 'post',
        url: `http://localhost:3000/question/detail/upvoteanswer/${String(payload)}`,
        data: {
          questionId: payload,
          token: token
        }
      }).then(response => {
        if (response.data.reload) {
          const stateData = {
            detail: this.state.backup,
            answer: this.state.answer
          }
          localStorage.setItem('backup', stateData)
          window.location.reload()
          commit('detail', localStorage.getItem('backup').backup)
          commit('answer', localStorage.getItem('backup').answer)
          this.$router.push('detail')
        } else {
          commit('answer', response.data[0].answer)
          commit('detail', response.data[0])
        }
      }).catch(err => {
        console.log(err);
      })
    },
    downVoteAnswer ({ commit }, payload) {
      const token = localStorage.getItem('authorization').split('*#$_.')[0]
      axios({
        method: 'post',
        url: `http://localhost:3000/question/detail/downvoteanswer/${payload.answerId}`,
        data: {
          questionId: payload,
          token: token
        }
      }).then(response => {
        if (response.data.reload) {
          const stateData = {
            detail: this.state.backup,
            answer: this.state.answer
          }
          localStorage.setItem('backup', stateData)
          window.location.reload()
          commit('detail', localStorage.getItem('backup').backup)
          commit('answer', localStorage.getItem('backup').answer)
          this.$router.push('detail')
        } else {
          commit('answer', response.data[0].answer)
          commit('detail', response.data[0])
        }
      }).catch(err => {
        console.log(err);
      })
    },
    UserData ({ commit }, payload) {
      commit('userdata', payload)
    },
    profileInfo ({ commit }, payload) {
      commit('profile', payload)
    }
  }
})
