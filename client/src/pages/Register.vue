<template>
	<FsCard>
		<template #title>Create your account</template>
		<template #subtitle>Sign up to start managing your collections</template>
		<v-form :disabled="register.fetching.value" class="text-end" @submit.prevent="onSubmit">
			<v-text-field v-model="form.pseudo" class="mb-2" label="Pseudo" hide-details prepend-inner-icon="mdi-account" />
			<PasswordField v-model="form.password" class="mb-2" label="Password" hide-details />
			<PasswordField v-model="form.password2" class="mb-2" label="Retype password" hide-details />
			<v-checkbox v-model="form.rememberMe" color="primary" label="Remember me" hide-details />
			<v-btn color="primary" text block @click="onSubmit">Create my account</v-btn>
		</v-form>
		<template #append>
			<h3>
				Already signed up?
				<router-link :to="{ name: 'Login' }">Sign in</router-link>
			</h3>
		</template>
	</FsCard>
</template>

<script setup lang="ts">

import { setJwt } from '@/graphql/client';
import { useSignupMutation } from '@/graphql/graphql';
import { reactive } from 'vue';
import FsCard from '@/components/FsCard.vue';
import PasswordField from '@/components/PasswordField.vue';

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
