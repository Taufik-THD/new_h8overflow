<template>
  <div class="body-background">
    <div class="container white z-depth-2 right slide-fwd-bottom" style="height: 90.5%; margin: 4.5% 1% 0 0; padding: 2.5% 0 0 0;" v-if='openLogin == true'>
      <a href="#" class="btn black btn-large" style="cursor: default; margin: 0 0 0 -2%">Sign In</a>
      <div id="login" class="col s10" style="padding: 20% 0 0 0;">
        <form class="col s10 form-container">
          <div class="row">
            <div class="input-field col s10">
              <input id="email" type="email" class="validate" v-model='loginData.email'>
              <label for="email">Email</label>
            </div>
            <div class="input-field col s10">
              <input id="password" type="password" class="validate" v-model='loginData.password'>
              <label for="password">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="col s5">
              <a class="btn waves-effect waves-light black" type="submit" @click='login' style="width:100%;">Sign In</a>
            </div>
            <div class="col s5">
              <a class="btn waves-effect waves-light black" type="submit" @click='close' style="width:100%; margin: 0 0 0 5%;">Cancel</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="container white z-depth-2 right slide-fwd-bottom" style="height: 90.5%; margin: 4.5% 1% 0 0; padding: 2.5% 0 0 0;" v-if='openRegister == true'>
      <a href="#" class="btn black btn-large" style="cursor: default; margin: 0 0 0 -2%">Sign Up Here</a>
    	<div id="login" class="col s10">
        <form class="col s10 form-container">
          <div class="row">
            <div class="input-field col s10" style="padding-right:15px;">
              <input id="fullname" type="text" class="validate" v-model='registerData.username'>
              <label for="fullname">Full Name</label>
            </div>
            <div class="input-field col s10" style="padding-right:15px;">
              <input id="email" type="text" class="validate" v-model='registerData.email'>
              <label for="email">Email</label>
            </div>
            <div class="input-field col s10" style="padding-right:15px;">
              <input id="password" type="password" class="validate" v-on:keyup='checkLength' v-model='registerData.password'>
              <label for="password">Password</label>
            </div>
            <div class="col" style="margin: -4% 0 0 0;">
              <label style="color:red;" v-if='validation == false'>Password minimum 6 character !</label>
            </div>
            <div class="input-field col s10" style="padding-right:15px;">
              <input id="confirmpassword" type="password" class="validate" v-on:keyup='checkValidate' v-model='registerData.confirm'>
              <label for="confirmpassword">Confirm Password</label>
            </div>
            <div class="col" style="margin: -4% 0 0 0;">
              <label style="color:red;" v-if='checkSame == false'>Password didn't match !</label>
            </div>
          </div>
          <div class="row">
            <div class="col s5">
              <a class="btn waves-effect waves-light black" type="submit" style="width:100%;" @click='register'>Sign Up</a>
            </div>
            <div class="col s5">
              <a class="btn waves-effect waves-light black" type="submit" @click='close' style="width:100%; margin: 0 0 0 5%;">Cancel</a>
            </div>
          </div>
        </form>
    	</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created(){
    if (localStorage.getItem('authorization')) {
      this.$router.push('questions')
    }
  },
  data(){
    return {
      loginData: {
        email: '',
        password: ''
      },
      registerData : {
        username: '',
        email: '',
        password: '',
        confirm: ''
      },
      modallogin: false,
      validation: true,
      checkSame: true
    }
  },
  computed : {
    openLogin () {
      return this.$store.state.formLogin
    },
    openRegister () {
      return this.$store.state.formRegister
    }
  },
  name: 'Homepage',
  methods: {
    login(){
      this.close()

      const user = {
        email: this.loginData.email,
        password: this.loginData.password
      }

      axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: user
      })
      .then(response => {
        this.$store.dispatch('profileInfo', response.data.userInfo)
        this.loginData.username = ''
        this.loginData.email = ''
        this.loginData.password = ''
        localStorage.setItem('authorization', response.data.jwtToken+'*#$_.'+response.data.userInfo._id)
        this.$router.push('questions')
      })
      .catch(err => {
        this.loginData.username = ''
        this.loginData.email=''
        this.loginData.password=''
      })
    },

    register(){
      if (this.validation == true && this.checkSame == true && this.registerData.password.length != 0) {

        this.close()

        const user = {
          username: this.registerData.username,
          email: this.registerData.email,
          password: this.registerData.password
        }

        axios({
          method: 'post',
          url: 'http://localhost:3000/users/register',
          data: user
        })
        .then((response) => {
          this.registerData.username = ''
          this.registerData.email = ''
          this.registerData.password = ''
          swal({
            title: "Yosh!",
            text: "Successfully register your account",
            icon: "success",
          });
        })
        .catch(err => {
          this.registerData.username = ''
          this.registerData.email=''
          this.registerData.password=''
          swal({
            text: "email is already exists",
            icon: "error",
          });
        })

      } else {
        swal({
          text: "Please input a valid data . . .",
          icon: "error"
        })
      }

    },
    close () {
      this.$store.dispatch('close')
      this.$store.dispatch('closeRegister')
    },
    registerPage () {
      this.$router.push('register')
    },
    checkLength () {
      if (this.registerData.password.length >= 6 || this.registerData.password.length == 0) {
        this.validation = true
      } else {
        this.validation = false
      }
    },
    checkValidate () {
      if (this.registerData.password == this.registerData.confirm || this.registerData.confirm.length == 0) {
        this.checkSame = true
      } else {
        this.checkSame = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ffffff;
}

.body-background{
  text-align: left;
  height: 100%;
  width: 100%;
}
.modal {
  overflow: hidden;
  width: 35%;
  height: 600px;
  margin-top: 0px;
  padding: 0 0 0 0;
}

h5
{
	font-weight: 400;
  color: black;
}

.container{
	margin: 0 0 0 0;
	width: 455px;
	height: 100%;
}

.tabs .indicator
{
	background-color: #1e2121;
	opacity: 0.3;
}

.form-container
{
	padding: 0 0 0 12%;
	padding-top: 10px;
}

.confirmation-tabs-btn
{
	position: absolute;
}
element.style {
    z-index: 1003;
    display: block;
    opacity: 1;
    top: 1%;
}
.navmedia{
  padding: 0 0 0 0;
  background-color: transparent;
  border: none;
}
.socmed{
  height:50px;
  width: 71.5px;
  text-align: center;
  font-size: 50px;
  margin:9% 50% 5px 10%;
}
.slide-fwd-bottom {
	-webkit-animation: slide-fwd-bottom 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: slide-fwd-bottom 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2018-7-2 19:13:53
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation slide-fwd-bottom
 * ----------------------------------------
 */
@-webkit-keyframes slide-fwd-bottom {
  0% {
    -webkit-transform: translateZ(0) translateY(-110%);
            transform: translateZ(0) translateY(-110%);
  }
  100% {
    -webkit-transform: translateZ(160px) translateY(-10%);
            transform: translateZ(160px) translateY(0px);
  }
}
@keyframes slide-fwd-bottom {
  0% {
    -webkit-transform: translateZ(0) translateY(-110%);
            transform: translateZ(0) translateY(-110%);
  }
  100% {
    -webkit-transform: translateZ(160px) translateY(-10%);
            transform: translateZ(160px) translateY(0px);
  }
}

</style>
