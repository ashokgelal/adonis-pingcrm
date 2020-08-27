import Vue from 'vue'
import VueMeta from 'vue-meta'
import PortalVue from 'portal-vue'
import {InertiaApp} from '@inertiajs/inertia-vue'

Vue.config.productionTip = false
Vue.mixin({
  methods: {
    route: (name, params) => {
      const baseUrl = process.env.MIX_APP_URL
      let uri = ''
      switch (name) {
        case 'login':
        case 'login.attempt':
          uri = 'login'
          break
        case 'logout':
          uri = 'logout'
          break
        case 'dashboard':
          uri = ''
          break
        case 'users':
          uri = 'users'
          break
        case 'users.create':
          uri = 'users/create'
          break
        case 'users.store':
          uri = 'users'
          break
        case 'users.edit':
          uri = `users/${params}/edit`
          break
        case 'users.update':
        case 'users.delete':
          uri = `users/${params}`
          break
        case 'users.restore':
          uri = `users/${params}/restore`
          break
        case 'organizations':
          const query = new URLSearchParams(params).toString()
          uri = query ? `organizations?${query}` : `organizations`
          break
        case 'organizations.create':
          uri = `organizations/create`
          break
        case 'organizations.store':
          uri = `organizations`
          break
        case 'organizations.edit':
          uri = `organizations/${params}/edit`
          break
        case 'organizations.update':
        case 'organizations.destroy':
          uri = `organizations/${params}`
          break
        case 'organizations.restore':
          uri = `organizations/${params}/restore`
          break
        case 'contacts':
          uri = `contacts`
          break
        case 'contacts.create':
          uri = `contacts/create`
          break
        case 'contacts.store':
          uri = `contacts/create`
          break
        case 'contacts.edit':
          uri = `contacts/${params}/edit`
          break
        case 'contacts.update':
        case 'contacts.destroy':
          uri = `contacts/${params}`
          break
        case 'contacts.restore':
          uri = `contacts/${params}/restore`
          break
        case 'reports':
          uri = `reports`
          break
        default:
          throw Error(`Route ${name} not found`)
      }
      return `${baseUrl}/${uri}`
    }
  }
})
Vue.use(InertiaApp)
Vue.use(PortalVue)
Vue.use(VueMeta)

let app = document.getElementById('app')

new Vue({
  metaInfo: {
    titleTemplate: (title) => title ? `${title} - Ping CRM` : 'Ping CRM'
  },

  render: h => h(InertiaApp, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: name => import(`@/Pages/${name}`).then(module => module.default),
    },
  }),
}).$mount(app)
