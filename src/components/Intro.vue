<template>
  <div class="modeless-dialog profile">
    <div class="hero">
      <div class="avatar">
        <img alt="avatar" src="../assets/avatar.webp" />
      </div>
      <div class="link">
        <strong class="name">bingling_sama</strong>
        <p class="text">
          An undergraduate of CCNU. Living in Wuhan, Hubei Province.
        </p>
        <p class="text">
          Email:
          <a href="mailto:bingling_sama@qq.com">bingling_sama@qq.com</a>
        </p>
      </div>
    </div>
    <div class="brief">
      <h2>Self Introduction</h2>
      <p class="text">
        Hi there, this is bingling_sama, an interest-driven programmer.
      </p>
      <ul class="text">
        <li>Web Engineer, using Vue.</li>
        <li>Java & Kotlin user, JVM the best!</li>
        <li>The sideline is Python.</li>
        <li>Work for LittleSkin Commspt.</li>
        <li>A die-hard fan of Minecraft.</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.profile {
  display: grid;
  gap: var(--layout-gap);
  font-size: 1rem;
  line-height: 1.6;
}

.hero {
  --avatar-size: 6rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--layout-gap);
}

.avatar {
  display: flex;
  flex: 0 1 var(--avatar-size);
  justify-content: center;
}

.avatar img {
  display: block;
  width: var(--avatar-size);
  max-width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
}

.link {
  display: grid;
  flex: 1 1 100%;
  min-width: 0;
  gap: var(--space-small);
}

.name {
  font-size: 1.25rem;
}

.brief {
  display: grid;
  gap: var(--space-small);
}

.profile p,
.brief h2,
.brief ul {
  margin: 0;
}

.brief h2 {
  font-size: 1.125rem;
}

.brief ul {
  padding-inline-start: var(--layout-gap);
}

.brief li + li {
  margin-block-start: var(--space-small);
}

.text {
  font-size: inherit;
}

@media (min-width: 30rem) {
  .hero {
    --avatar-size: clamp(8rem, 22vw, 10rem);
  }

  .link {
    flex-basis: 14rem;
  }
}
</style>
