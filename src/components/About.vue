<template>
  <div class="modeless-dialog about">
    <h1 class="dialog-text">About</h1>
    <span class="dialog-text">This is a webpage made with
      <a href="https://vue3js.cn"> Vue 3</a> &
      <a href="https://cn.vitejs.dev"> Vite</a> &
      <a href="https://github.com/sakofchit/system.css"> System.css</a>, deployed on
      <a href="https://vercel.com"> Vercel</a>.
    </span><br>
    <span class="dialog-text">Love from China❤️</span>
    <h5 class="dialog-text">&copy; 2020 bingling_sama</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "About"
})
</script>

<style scoped>

</style>