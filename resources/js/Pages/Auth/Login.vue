<template>
  <div class="flex items-center justify-center min-h-screen p-6 bg-indigo-800">
    <div class="w-full max-w-md">
      <logo class="block w-full max-w-xs mx-auto fill-white" height="50" />
      <form class="mt-8 overflow-hidden bg-white rounded-lg shadow-xl" @submit.prevent="submit">
        <div class="px-10 py-12">
          <h1 class="text-3xl font-bold text-center">Welcome Back!</h1>
          <div class="w-24 mx-auto mt-6 border-b-2" />
          <text-input v-model="form.email" :errors="$page.errors.uid || []" class="mt-10" label="Email" type="email" autofocus autocapitalize="off" />
          <text-input v-model="form.password" :errors="$page.errors.password"  class="mt-6" label="Password" type="password" />
          <label class="flex items-center mt-6 select-none" for="remember">
            <input id="remember" v-model="form.remember" class="mr-1" type="checkbox">
            <span class="text-sm">Remember Me</span>
          </label>
        </div>
        <div class="flex items-center justify-between px-10 py-4 bg-gray-100 border-t border-gray-200">
          <a class="hover:underline" tabindex="-1" href="#reset-password">Forget password?</a>
          <loading-button :loading="sending" class="btn-indigo" type="submit">Login</loading-button>
        </div>
      </form>
      <div class="p-4 leading-relaxed text-indigo-800 bg-indigo-100 border border-indigo-100 rounded mt-8 shadow">
        This demo app is built using <a href="https://preview.adonisjs.com" class="inline-block font-semibold hover:underline hover:text-indigo-700" target="_adonis">Adonis</a> and <a href="https://inertiajs.com/" class="inline-block font-semibold hover:underline hover:text-indigo-700" target="_inertia">InertiaJS</a> and deployed using <a href="https://cleaver.cloud/?utm_source=pingcrm" class="inline-block font-semibold hover:underline hover:text-indigo-700" target="_cleaver">Cleaver</a>.
        <div class="mt-6">The database is reset every hour. Please be respectful when using the app so that we can continue to enjoy good things. <span class="font-medium">You are awesomazing!</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from '@/Shared/LoadingButton'
import Logo from '@/Shared/Logo'
import TextInput from '@/Shared/TextInput'

export default {
  metaInfo: { title: 'Login' },
  components: {
    LoadingButton,
    Logo,
    TextInput,
  },
  props: {
    errors: Object,
  },
  data() {
    return {
      sending: false,
      form: {
        email: 'johndoe@example.com',
        password: 'secret',
        remember: null,
      },
    }
  },
  methods: {
    submit() {
      this.sending = true
      this.$inertia.post(this.route('login.attempt'), {
        email: this.form.email,
        password: this.form.password,
        remember: this.form.remember,
      }).then(() => this.sending = false)
    },
  },
}
</script>
