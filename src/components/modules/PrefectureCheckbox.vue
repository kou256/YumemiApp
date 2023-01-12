<template>
  <label>
    <input type="checkbox" :value="prefCode" @change="onChange" />
    {{ prefName }}
  </label>
</template>
<script lang="js">
export default {
  name: 'PrefectureCheckbox',
  props: {
    prefCode: {
      type: Number,
      required: true
    },
    prefName: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange(event) {
      // 対象の都道府県コードと状態を伝搬
      this.$emit('toggled', {
        prefCode: event.target.value,
        checked: event.target.checked
      });
    }
  }
}
</script>
