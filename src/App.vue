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

<script lang="ts" setup>
</script>

<style>
body {
	display: flex;
	align-items: center;
	justify-content: center;
}

#app {
	@media screen {
		width: 30rem;
	}
}

.details {
	padding: 0.5rem 1.3rem 0.5rem 1.3rem;
}
</style>
