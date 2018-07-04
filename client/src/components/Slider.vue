<template>
  <div class="" style="width:50%; height:150%; margin: 10% 0 0 0; background-color:transparent; position:fixed;">
    <div class="slider" style="background-color:transparent;">
      <ul class="slides" style="background-color:transparent;">
        <li>
          <div class="caption left-align">
            <br>
            <h4>BILL GATES</h4>
            <p>" Measuring programming progress by lines of "</p>
            <p style="margin:-3% 0 0 1%;">  code is like measuring aircraft building </p>
            <p style="margin:-1.5% 0 0 1%;">  progress by wieght. "</p>
          </div>
        </li>
        <li>
          <div class="caption left-align">
            <h4>ALAN J. PERLIS</h4>
            <p>" There are two ways to write error-free programs: "</p>
            <p style="margin:-3% 0 0 1%;"> only the third one works. "</p>
          </div>
        </li>
        <li>
          <div class="caption left-align">
            <br>
            <h4>EDWARD V BERARD</h4>
            <p>" Walking on water and developing sorftware from "</p>
            <p style="margin:-3% 1% 0 1%;">  a specification are easy if both are frozen. "</p>
          </div>
        </li>
        <li>
          <div class="caption left-align">
            <br>
            <h4>STEVE JOBS</h4>
            <p>" Everyone should know how to program a computer,"</p>
            <p style="margin:-3% 0 0 1%;">  because it teaches you how to think! </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Slider',
  props: {
    msg: String
  },
  methods: {
    close () {
      this.$store.dispatch('close')
      this.$store.dispatch('closeRegister')
    }
  },
  mounted() {
    $(document).ready(function(){
      $('.slider').slider({full_width: true});
    });
  }
}
</script>

<style>
</style>
