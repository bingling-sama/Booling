<template>
	<div class="modeless-dialog content">
		<div class="profile">
			<div class="avatar">
				<img style="height: 80%;" alt="avatar" src="../assets/avatar.webp" />
			</div>
			<div class="info">
				<span style="font-weight: bold;">bingling_sama</span>
				<br />
				<span class="text">A high school student from China. Living in Wuhan, Hubei Province.
				</span>
				<span class="text">Email:
					<a href="mailto:bingling_sama@qq.com">bingling_sama@qq.com</a>
				</span>
			</div>
		</div>
		<div class="intro">
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

<script lang="ts" setup>
</script>

<style scoped>
.content {
	padding: 0.5rem 0.5rem 0.5rem 0.5rem !important;
}

.profile {
	display: flex;
	align-items: center;
	justify-content: center;
}

.avatar {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 8rem;
	width: 8rem;
}

.info {
	width: 20rem;
	padding: .5rem 0 .5rem .5rem;
}

.intro {
	width: 26rem;
	padding: .5rem 0 0 1rem;
}

.intro ul {
	padding-left: 2rem;
}

.text {
	font-size: medium;
}
</style>