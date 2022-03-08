<template>
	<FsCard>
		<template #title>Login</template>
		<template #subtitle>Login to your CollecHandler instance to manage your collections</template>
		<v-form :disabled="login.fetching.value" class="text-end" @submit.prevent="onSubmit">
			<v-text-field
				v-model="form.pseudo"
				class="mb-2"
				autofocus
				hide-details
				label="Pseudo"
				prepend-inner-icon="mdi-account"
			/>
			<PasswordField v-model="form.password" class="mb-2" hide-details label="Password" />
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
import { useLoginMutation } from '@/graphql/graphql';
import { reactive } from 'vue';
import FsCard from '@/components/FsCard.vue'
import PasswordField from '@/components/PasswordField.vue';

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
