<template>
  <div class="nav" style="background-color:rgba(0, 0, 0, 0.1); margin: 4.3% 0 0 0; position:fixed;">
    <div class="input-field">
      <nav style="background-color:rgba(0, 0, 0, 0);">
        <div class="item" style="margin: 65% 0 0 0;">
          <ul id="nav transparent" class="">
            <li><a class="btn waves-effect waves-dark transparent btn-large" style="transform: rotate(270deg); width:200%; height:50%; margin: 40% 0 0 -75%;" @click='profile'>My Profile</a> </li>
            <li><a class="btn waves-effect waves-dark transparent btn-large" style="transform: rotate(270deg); width:200%; height:50%; margin: 174% 0 0 -78%;" @click='addNewQuestion'>Add New Question</a> </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalTransaction: 0
    }
  },
  methods: {
    logout () {
      swal("Are you sure want to logout?", {
        dangerMode: true,
        buttons: true,
      })
      .then((accept) => {
        if (accept) {
          localStorage.clear()
          this.$router.push('/')
        }
      })
    },
    goToItems () {
      this.$router.push('admin')
    },
    goToOrders () {
      this.$router.push('orders')
    },
    getTotal () {
      this.totalTransaction = this.$store.state.transaction.length
    },
    addNewQuestion () {
      this.$router.push('add')
    },
    profile () {
      this.$router.push('profile')
    }
  }
}
</script>

<style lang="css">
.nav {
    height: 100%;
    width: 4.4%;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 20px;
}

nav {
    width: 100%;
    height: 56px;
}

.sidenav a {
    padding: 6px 6px 6px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.main {
    margin-left: 200px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
