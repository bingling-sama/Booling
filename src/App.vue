<template>
  <div class="container">
    <div class="window">
      <div class="title-bar">
        <h1 class="title">Booling✨</h1>
      </div>

      <nav class="details-bar details" aria-label="Primary navigation">
        <router-link to="/"><span>Home</span></router-link>
        <a href="https://blog.booling.cn/"><span>Blog</span></a>
        <router-link to="/about"><span>About</span></router-link>
      </nav>

      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-height: 100svh;
  padding-block: max(var(--page-gutter), env(safe-area-inset-top))
    max(var(--page-gutter), env(safe-area-inset-bottom));
  padding-inline: max(var(--page-gutter), env(safe-area-inset-left))
    max(var(--page-gutter), env(safe-area-inset-right));
}

.window {
  /* Prefer the bundled retro font over macOS's installed Menlo. */
  font-family: Chicago, Geneva, sans-serif;
  display: flex;
  flex: none;
  width: 100%;
  max-width: var(--window-max-width);
  min-width: 0;
  margin: 0;
  overflow: visible;
}

.details {
  gap: var(--space-small);
  padding: 0 var(--space-small);
}

.title-bar {
  height: auto;
  min-height: 2rem;
}

.title-bar .title {
  min-width: 0;
  overflow-wrap: anywhere;
}

.details a {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: var(--touch-target);
  padding: var(--space-small);
  overflow-wrap: anywhere;
}

.details a span {
  min-width: 0;
  padding: 0.125em 0.375em;
}

.details a:hover span,
.details a:active span {
  color: var(--primary);
  background-color: var(--secondary);
}

.details a:focus-visible {
  outline: none;
}

.details a:focus-visible span {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.details .router-link-exact-active {
  text-decoration-thickness: 0.125em;
}

.content {
  min-width: 0;
  padding: var(--content-padding);
  overflow-wrap: anywhere;
}

.content a:hover {
  text-decoration-thickness: 0.125em;
}

.content a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.content > .modeless-dialog {
  height: auto;
  padding: 0;
}

@media (min-width: 48rem) {
  .window {
    margin-block: auto;
  }
}
</style>
