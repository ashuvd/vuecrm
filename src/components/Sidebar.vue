<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      tag="li"
      :to="link.to"
      exact-active-class="active"
      v-for="link in links"
      :key="link.to"
    >
      <a href="" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';
export default {
  props: ['value'],
  name: 'Sidebar',
  data: () => ({
    links: [
      { title: localizeFilter('Menu_Bill'), to: '/' },
      { title: localizeFilter('Menu_History'), to: '/history' },
      { title: localizeFilter('Menu_Planning'), to: '/planning' },
      { title: localizeFilter('Menu_NewRecord'), to: '/record' },
      { title: localizeFilter('Menu_Categories'), to: '/categories' }
    ]
  })
};
</script>

<style scoped></style>
