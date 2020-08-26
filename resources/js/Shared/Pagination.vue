<template>
  <div class="mt-6 -mb-1 flex flex-wrap">
    <template v-for="(link, key) in pagination">
      <div v-if="link.url === null" :key="key" class="mr-1 mb-1 px-4 py-3 text-sm border rounded text-gray-400" :class="{ 'ml-auto': link.page === 'Next' }">{{ link.page }}</div>
      <inertia-link v-else :key="key" class="mr-1 mb-1 px-4 py-3 text-sm border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500" :class="{ 'bg-white': link.isActive, 'ml-auto': link.page === 'Next' }" :href="link.url">{{ link.page }}</inertia-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    links: Array,
    meta: Object
  },
  data() {
    return {
      pagination: [{isActive: false, page: 'Previous', url: this.meta.previous_page_url}, ...this.links, {isActive: false, page: 'Next', url: this.meta.next_page_url}]
    }
  }
}
</script>
