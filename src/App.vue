<template>
  <div class="window">
    <div class="title-bar">
      <h1 class="title">Booling✨</h1>
    </div>

    <div class="details-bar details">
      <router-link to="/">Home</router-link>
      <a href="/blog">Blog</a>
      <router-link to="/about">About</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style scoped></style>
