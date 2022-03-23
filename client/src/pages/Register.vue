<template>
	<FsCard>
		<template #title>Create your account</template>
		<template #subtitle>Sign up to start managing your collections</template>
		<v-form :disabled="register.fetching.value" class="text-end" @submit.prevent="onSubmit">
			<v-text-field
				v-model="form.pseudo"
				class="mb-2"
				:error-messages="errors.pseudo"
				label="Pseudo"
				hide-details="auto"
				prepend-inner-icon="mdi-account"
			/>
			<PasswordField v-model="form.password" class="mb-2" :error-messages="errors.password" label="Password" />
			<PasswordField v-model="form.password2" class="mb-2" :error-messages="errors.password2" label="Retype password" />
			<v-checkbox v-model="form.rememberMe" color="primary" label="Remember me" hide-details />
			<v-btn :disabled="register.fetching.value" type="submit" color="primary" text block>Create my account</v-btn>
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
const errors = reactive({ pseudo: undefined as string | undefined, password: undefined as string | undefined, password2: undefined as string | undefined })
const register = useSignupMutation()

const onSubmit = async () => {
	errors.pseudo = undefined
	errors.password = undefined
	errors.password2 = undefined

	if (!form.pseudo) {
		errors.pseudo = 'Empty pseudo'
		return
	}
	if (form.password !== form.password2) {
		errors.password2 = 'Passwords not matching'
		return
	}
	if (!form.password) {
		errors.password = 'Empty password'
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
