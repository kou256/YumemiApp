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
