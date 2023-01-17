<template>
  <TheHeader title="YumemiApp" />
  <PrefecturesPage />
</template>
<script lang="js">
import TheHeader from './components/modules/TheHeader.vue';
import PrefecturesPage from './components/PrefecturesPage.vue';
export default {
  name: 'App',
  components: {
    TheHeader,
    PrefecturesPage
  },
}
</script>

<style scoped></style>
