<template>
  <TheHeader title="YumemiApp" />
  <PrefecturesList />
</template>
<script lang="js">
import TheHeader from './components/modules/TheHeader.vue';
import PrefecturesList from './components/PrefecturesList.vue';
export default {
  name: 'App',
  components: {
    TheHeader,
    PrefecturesList
  },
}
</script>

<style scoped></style>
