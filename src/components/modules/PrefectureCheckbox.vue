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
<style>
input[type='checkbox'] {
  appearance: none;
  position: relative;
  width: 1rem;
  height: 1rem;
  border: 1px solid #003b77;
  border-radius: 0.2rem;
  vertical-align: -5px;
}
input[type='checkbox']::before {
  content: '✓';
  position: absolute;
  visibility: hidden;
  color: #38b48b;
  top: -0.2rem;
  font-size: 1rem;
}
input[type='checkbox']:checked::before {
  visibility: visible;
}
label {
  color: #003b77;
}
</style>
