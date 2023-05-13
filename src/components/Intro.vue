<template>
  <div class="modeless-dialog content">
    <div class="profile">
      <div class="avatar">
        <img class="avatar__image" alt="avatar" src="../assets/avatar.webp" />
      </div>

      <div class="intro">
        <h1 class="name">bingling_sama</h1>
        <span class="text">A high school student from China. Living in Wuhan, Hubei
          Province.</span>
        <span class="text">Email:
          <a href="mailto:bingling_sama@qq.com">bingling_sama@qq.com</a></span>
      </div>
    </div>

    <div class="self-intro">
      <span>Self Introduction</span><br />
      <span class="text">Hi there, this is bingling_sama, an interest-driven
        programmer.</span>
      <ul class="text">
        <li>Web Engineer, using Vue.</li>
        <li>Java & Kotlin user, JVM the best!</li>
        <li>The sideline is Python.</li>
        <li>Also learning Rust...</li>
        <li>Work for LittleSkin Commspt.</li>
        <li>A big fan of Minecraft.</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Intro'
})
</script>

<style scoped></style>