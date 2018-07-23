<template>
  <div class="home">
    <Question />
    <Header />
    <Sidenav />
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue'
import Header from '@/components/Header.vue'
import Sidenav from '@/components/Sidenav.vue'

export default {
  name: 'home',
  components: {
    Header,
    Question,
    Sidenav
  }
}
</script>
