<template>
	<h1>Register</h1>

	<form @submit.prevent="onSubmit">
		<input type="text" v-model="form.pseudo" placeholder="Pseudo" autofocus />
		<br />
		<input type="password" v-model="form.password" placeholder="Password" />
		<br />
		<input type="password" v-model="form.password2" placeholder="Retype password" />
		<br />
		<label for="rememberMe">Remember me</label>
		<input type="checkbox" id="rememberMe" v-model="form.rememberMe" />
		<br />
		<input type="submit" />
	</form>

	<router-link :to="{ name: 'Login' }">Login</router-link>
</template>

<script setup lang="ts">

import { setJwt } from '@/graphql/client';
import { useSignupMutation } from '@/graphql/graphql';
import { reactive } from 'vue';

const form = reactive({ pseudo: "", password: "", password2: "", rememberMe: false })
const register = useSignupMutation()

const onSubmit = async () => {
	if (form.password !== form.password2) {
		alert('Passwords not matching');
		return
	}
	const res = await register.executeMutation({ pseudo: form.pseudo, password: form.password })
	if (res.error || !res.data?.signup?.token) {
		alert("Error logging in")
		return
	}
	const token = res.data.signup.token
	setJwt(token, form.rememberMe)
}

</script>
