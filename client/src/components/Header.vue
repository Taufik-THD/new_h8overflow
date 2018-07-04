<template lang="html">
  <nav class="header" style="; position:fixed;">
    <div class="nav-wrapper">
      <a class="brand-logo left" style="margin-left:-43%; font-size:15px; cursor:pointer;" @click='backToQuestion'><b>STUCKOVERFLOW</b><i class="material-icons prefix">computer</i></a>
      <ul class="right hide-on-med-and-down" style="margin: 0 5% 0 0;">
        <li @click='openLogin'><a class="waves-effect waves-dark" style="color:white; margin: 0 50% 0 -20%; width:100%;" v-if='checkToken() == true'><b>Login</b> </a></li>
        <li @click='openRegister'><a class="waves-effect waves-dark" style="color:white; margin: 0 0 0 0;" v-if='checkToken() == true'><b>Register</b> </a></li>
        <li @click='backToQuestion'><a class="waves-effect waves-dark" style="color:white" v-if='checkToken() == false'><b>Home</b> </a></li>
        <li @click='logout'><a class="waves-effect waves-dark" style="color:white; margin: 0 0 0 40%;" v-if='checkToken() == false'><b>Logout</b> </a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  created () {
    this.checkToken()
    if (this.checkToken() == true) {
      this.$router.push('/')
    }
  },
  methods: {
    openLogin () {
      this.$store.dispatch('closeRegister')
      this.$store.dispatch('open')
    },
    openRegister () {
      this.$store.dispatch('close')
      this.$store.dispatch('openRegister')
    },
    backToQuestion () {
      this.$router.push('questions')
    },
    checkToken () {
      if (!localStorage.getItem('authorization')) {
        return true
      } else {
        return false
      }
    },
    logout () {
      swal("Are you sure want to logout?", {
        dangerMode: true,
        buttons: true
      })
      .then((accept) => {
        if (accept) {
          localStorage.clear()
          this.$router.push('/')
        }
      })

    }
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #ffffff;
}

.header {
  background-image: url("http://getwallpapers.com/wallpaper/full/0/6/4/40669.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.body-background{
  text-align: left;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
}

.modal {
  overflow: hidden;
  width: 35%;
  height: 600px;
  margin-top: 0px;
  padding: 0 0 0 0;
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
	padding: 40px;
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
</style>
