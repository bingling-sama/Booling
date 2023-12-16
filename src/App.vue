<template>
	<div class="container">
		<div class="window">
			<div class="title-bar">
				<h1 class="title">Booling✨</h1>
			</div>

			<div class="details-bar details">
				<router-link to="/">Home</router-link>
				<a href="/blog">Blog</a>
				<router-link to="/about">About</router-link>
			</div>

			<div class="content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style>
.container {
	display: grid;
	grid-template-columns: minmax(0, 1fr) 1fr minmax(0, 1fr);
	grid-template-rows: 1fr 30rem 1fr;
	gap: 0 0;
	grid-template-areas:
		'. . .'
		'. main .'
		'. . .';
	margin: 0 0 0 0;
	height: 100vh;
}

.window {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 2rem 2rem 1fr;
	gap: 0 0;
	grid-area: main;
	grid-template-areas:
		'title title title'
		'nav nav nav'
		'content content content'
		'content content content';
}

.header {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 0 0;
	grid-area: header;
}

.title-bar {
	grid-area: title;
}

.details {
	grid-area: nav;
}

.content {
	grid-area: content;
}

html,
body {
	height: 100%;
	margin: 0;
}
</style>
