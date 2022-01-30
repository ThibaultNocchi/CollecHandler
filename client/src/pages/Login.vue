<template>
	<v-row align="center" justify="center">
		<v-col sm="10" lg="6" xl="4" class="text-center">
			<v-card>
				<v-card-header>
					<v-card-header-text>
						<v-card-title>Login</v-card-title>
						<v-card-subtitle>Login to your CollecHandler instance to manage your collections</v-card-subtitle>
					</v-card-header-text>
				</v-card-header>
				<v-card-text>
					<v-form class="text-end" @submit.prevent="onSubmit">
						<v-text-field v-model="form.pseudo" autofocus hide-details label="Pseudo" prepend-inner-icon="mdi-account" />
						<v-text-field
							v-model="form.password"
							dense
							hide-details
							label="Password"
							prepend-inner-icon="mdi-key"
							:type="showPassword ? 'text' : 'password'"
						>
							<template #append class="pointer">
								<v-icon @click="showPassword = !showPassword" class="pointer">{{ showPassword ? "mdi-eye" : "mdi-eye-off" }}</v-icon>
							</template>
						</v-text-field>
						<v-checkbox v-model="form.rememberMe" color="primary" label="Remember me" hide-details />
						<v-btn color="primary" text block @click="onSubmit">Login</v-btn>
					</v-form>
				</v-card-text>
			</v-card>
			<h3 class="mt-4">
				Don't have an account?
				<router-link :to="{ name: 'Register' }">Sign up</router-link>
			</h3>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">

import { setJwt } from '@/graphql/client';
import { useLoginMutation } from '@/graphql/graphql';
import { reactive, ref } from 'vue';

const form = reactive({
	pseudo: '',
	password: '',
	rememberMe: false
})
const showPassword = ref(false)

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
