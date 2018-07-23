<template>
  <div class="home">
    <Detail />
    <Header />
    <Sidenav />
  </div>
</template>

<script>
// @ is an alias to /src
import Detail from '@/components/Detail.vue'
import Header from '@/components/Header.vue'
import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    Detail,
    Header,
    Sidenav
  }
}
</script>
