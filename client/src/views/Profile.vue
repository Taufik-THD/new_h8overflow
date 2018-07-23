<template>
  <div class="home">
    <Profile />
    <Header />
    <Sidenav />
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/Profile.vue'
import Header from '@/components/Header.vue'
import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    Header,
    Profile,
    Sidenav
  }
}
</script>
