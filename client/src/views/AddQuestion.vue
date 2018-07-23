<template>
  <div class="home">
    <Header />
    <Sidenav />
    <AddQuestion />
  </div>
</template>

<script>
// @ is an alias to /src
import AddQuestion from '@/components/AddQuestion.vue'
import Header from '@/components/Header.vue'
import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    Header,
    AddQuestion,
    Sidenav
  }
}
</script>
