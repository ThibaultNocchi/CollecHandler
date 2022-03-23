<template>
	<FsCard>
		<template #title>Login</template>
		<template #subtitle>Login to your CollecHandler instance to manage your collections</template>
		<v-form :disabled="login.fetching.value" class="text-end" @submit.prevent="onSubmit">
			<v-text-field
				v-model="form.pseudo"
				class="mb-2"
				autofocus
				:error="isError"
				hide-details="auto"
				label="Pseudo"
				prepend-inner-icon="mdi-account"
			/>
			<PasswordField v-model="form.password" class="mb-2" :error-messages="form.errors" label="Password" />
			<v-checkbox v-model="form.rememberMe" color="primary" label="Remember me" hide-details />
			<v-btn :disabled="login.fetching.value" type="submit" color="primary" text block>Login</v-btn>
		</v-form>
		<template #append>
			<h3>
				Don't have an account?
				<router-link :to="{ name: 'Register' }">Sign up</router-link>
			</h3>
		</template>
	</FsCard>
</template>

<script setup lang="ts">

import { setJwt } from '@/graphql/client';
import { Errors, useLoginMutation } from '@/graphql/graphql';
import { computed, reactive } from 'vue';
import FsCard from '@/components/FsCard.vue'
import PasswordField from '@/components/PasswordField.vue';

const form = reactive({
	pseudo: '',
	password: '',
	rememberMe: false,
	errors: undefined as string | undefined
})

const isError = computed(() => !!form.errors)

const login = useLoginMutation()

const onSubmit = async () => {
	form.errors = undefined
	const res = await login.executeMutation({ password: form.password, pseudo: form.pseudo })
	if (res.error || !res.data?.login?.token) {
		if (res.error?.message === Errors.Login) form.errors = 'Wrong credentials'
		else form.errors = 'Unrecognized error'
		return
	}
	const token = res.data.login.token
	setJwt(token, form.rememberMe)
}

</script>
