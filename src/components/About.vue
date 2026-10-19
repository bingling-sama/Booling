<template>
  <div class="modeless-dialog about">
    <h1 class="dialog-text">About</h1>
    <p class="dialog-text">
      This is a webpage made with <a href="https://vuejs.org/"> Vue 3</a> &
      <a href="https://vite.dev/"> Vite</a> &
      <a href="https://github.com/sakofchit/system.css"> System.css</a>,
      deployed on <a href="https://vercel.com"> Vercel</a>.
    </p>
    <p class="dialog-text">
      You can find the source code of this page on
      <a href="https://github.com/bingling-sama/Booling/">GitHub</a>.
    </p>
    <p class="dialog-text">Love from China❤️</p>
    <p class="dialog-text copyright">
      &copy; 2020–{{ new Date().getFullYear() }} bingling_sama
    </p>
  </div>
</template>

<style scoped>
.about {
  display: grid;
  gap: var(--layout-gap);
  font-size: 1rem;
  line-height: 1.45;
  text-align: start;
}

.about h1,
.about p {
  margin: 0;
}

.about h1 {
  font-size: 1.5rem;
}

.copyright {
  font-size: 0.875rem;
}

@media (min-width: 30rem) {
  .about {
    text-align: center;
  }
}
</style>
