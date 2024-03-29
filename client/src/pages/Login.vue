<template>
	<FsCard>
		<template #title>Login</template>
		<template #subtitle>Login to your CollecHandler instance to manage your collections</template>
		<v-form :disabled="login.loading.value" class="text-end" @submit.prevent="onSubmit">
			<v-text-field
				v-model="pseudo"
				class="mb-2"
				autofocus
				:error="isError"
				hide-details="auto"
				label="Pseudo"
				prepend-inner-icon="mdi-account"
			/>
			<PasswordField v-model="password" class="mb-2" :error-messages="errors" label="Password" />
			<v-checkbox v-model="rememberMe" color="primary" label="Remember me" hide-details />
			<v-btn :disabled="login.loading.value" type="submit" color="primary" text block>Login</v-btn>
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
import { useMutation } from '@vue/apollo-composable'
import { setJwt } from '@/graphql/client';
import { computed, ref, Ref } from 'vue';
import FsCard from '@/components/FsCard.vue'
import PasswordField from '@/components/PasswordField.vue';
import { LoginDocument, Errors } from '@/graphql/graphql';

const pseudo = ref('')
const password = ref('')
const rememberMe = ref(false)
const errors: Ref<string | undefined> = ref(undefined)

const isError = computed(() => !!errors.value)

const login = useMutation(LoginDocument)
login.onDone((res) => {
	if (!res.data?.login?.token) throw Error
	setJwt(res.data.login.token, rememberMe.value)
})
login.onError((err) => {
	if (err.message === Errors.Login) errors.value = 'Wrong credentials'
	else errors.value = 'Unrecognized error'
})

const onSubmit = async () => {
	errors.value = undefined
	login.mutate({ pseudo: pseudo.value, password: password.value })
}

</script>
