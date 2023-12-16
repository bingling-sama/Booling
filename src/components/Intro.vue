<template>
	<div class="modeless-dialog profile">
		<div class="hero">
			<div class="avatar">
				<img style="width: 80%" alt="avatar" src="../assets/avatar.webp" />
			</div>
			<div class="link">
				<span style="font-weight: bold">bingling_sama</span>
				<br />
				<span class="text">A high school student from China. Living in Wuhan, Hubei Province.
				</span>
				<span class="text">Email:
					<a href="mailto:bingling_sama@qq.com">bingling_sama@qq.com</a>
				</span>
			</div>
		</div>
		<div class="brief">
			<span>Self Introduction</span>
			<span class="text">Hi there, this is bingling_sama, an interest-driven programmer.</span>
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

<script lang="ts" setup></script>

<style scoped>
.profile {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1.5fr;
	gap: 0px 0px;
	grid-auto-flow: row;
	grid-template-areas:
		'hero hero'
		'brief brief';
	padding: 0 0.5rem 0 0;
}

.hero {
	display: grid;
	grid-template-columns: 1fr 1.5fr;
	grid-template-rows: 1fr;
	gap: 0px 0px;
	grid-auto-flow: row;
	grid-template-areas: 'avatar link';
	grid-area: hero;
}

.avatar {
	grid-area: avatar;
	display: flex;
	align-items: center;
	justify-content: center;
	height: auto;
}

.link {
	grid-area: link;
	padding: 0.5rem 0 0.5rem 0.5rem;
}

.brief {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 1.5fr;
	gap: 0px 0px;
	grid-auto-flow: row;
	grid-area: brief;
	padding: 0.5rem 0 0 1rem;
}

.brief ul {
	padding-left: 2rem;
}

.text {
	font-size: medium;
}
</style>
