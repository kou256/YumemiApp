<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>
<script lang="js">
export default {
  name: 'TheHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style>
header {
  width: 100%;
}

h1 {
  color: #38b48b;
  font-size: 2rem;
  text-align: center;
  margin-block-start: 0.25em;
  margin-block-end: 0.25em;
}
</style>
