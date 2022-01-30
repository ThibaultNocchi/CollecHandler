<template>
	<h1>Login</h1>

	<form @submit.prevent="onSubmit">
		<input type="text" v-model="form.pseudo" placeholder="Pseudo" autofocus />
		<br />
		<input type="password" v-model="form.password" placeholder="Password" />
		<br />
		<label for="rememberMe">Remember me</label>
		<input type="checkbox" id="rememberMe" v-model="form.rememberMe" />
		<br />
		<input type="submit" />
	</form>

	<router-link :to="{ name: 'Register' }">Register</router-link>
</template>

<script setup lang="ts">

import { setJwt } from '@/graphql/client';
import { useLoginMutation } from '@/graphql/graphql';
import { reactive } from 'vue';

const form = reactive({
	pseudo: '',
	password: '',
	rememberMe: false
})

const login = useLoginMutation()

const onSubmit = async () => {
	const res = await login.executeMutation({ password: form.password, pseudo: form.pseudo })
	if (res.error || !res.data?.login?.token) {
		alert("Error logging in")
		return
	}
	const token = res.data.login.token
	setJwt(token, form.rememberMe)
}

</script>
