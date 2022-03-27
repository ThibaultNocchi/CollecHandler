<template>
	<FsCard>
		<template #title>Create your account</template>
		<template #subtitle>Sign up to start managing your collections</template>
		<v-form :disabled="register.loading.value" class="text-end" @submit.prevent="onSubmit">
			<v-text-field
				v-model="payload.pseudo"
				class="mb-2"
				:error-messages="errors.pseudo"
				label="Pseudo"
				hide-details="auto"
				prepend-inner-icon="mdi-account"
			/>
			<PasswordField v-model="payload.password" class="mb-2" :error-messages="errors.password" label="Password" />
			<PasswordField v-model="password2" class="mb-2" :error-messages="errors.password2" label="Retype password" />
			<v-checkbox v-model="rememberMe" color="primary" label="Remember me" hide-details />
			<v-btn :disabled="register.loading.value" type="submit" color="primary" text block>Create my account</v-btn>
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
import { useMutation } from '@vue/apollo-composable'
import { setJwt } from '@/graphql/client';
import { reactive, ref } from 'vue';
import FsCard from '@/components/FsCard.vue';
import PasswordField from '@/components/PasswordField.vue';
import { SignupDocument } from '@/graphql/graphql';

const payload = reactive({ pseudo: "", password: "" })
const password2 = ref('')
const rememberMe = ref(false)

const errors = reactive({ pseudo: undefined as string | undefined, password: undefined as string | undefined, password2: undefined as string | undefined })
const register = useMutation(SignupDocument, { variables: payload })


const onSubmit = async () => {
	errors.pseudo = undefined
	errors.password = undefined
	errors.password2 = undefined

	if (!payload.pseudo) {
		errors.pseudo = 'Empty pseudo'
		return
	}
	if (payload.password !== password2.value) {
		errors.password2 = 'Passwords not matching'
		return
	}
	if (!payload.password) {
		errors.password = 'Empty password'
		return
	}

	try {
		const res = await register.mutate()
		if (!res?.data?.signup?.token) throw Error
		const token = res.data.signup.token
		setJwt(token, rememberMe.value)
	} catch {
		if (register.error.value)
			alert("Error signing up")
	}
}

</script>
