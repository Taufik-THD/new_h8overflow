<template>
  <div class="home">
    <Homepage />
    <Header />
    <Slider />
  </div>
</template>

<script>
// @ is an alias to /src
import Homepage from '@/components/Homepage.vue'
import Header from '@/components/Header.vue'
import Slider from '@/components/Slider.vue'

export default {
  name: 'home',
  components: {
    Homepage,
    Header,
    Slider
  }
}
</script>
