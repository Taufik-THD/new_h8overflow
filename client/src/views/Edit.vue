<template>
  <div class="home">
    <Header />
    <Sidenav />
    <Edit />
  </div>
</template>

<script>
// @ is an alias to /src
import Edit from '@/components/Edit.vue'
import Header from '@/components/Header.vue'
import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    Header,
    Edit,
    Sidenav
  }
}
</script>
