<template>
  <v-textarea
    v-bind="$attrs"
    :label="label"
    :placeholder="placeholder"
    :v-model="modelValue"
  ></v-textarea>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: [String, Number],
      default: "Details goes here!",
    },
    modelValue:{
        type:[String,Number],
        default:""
    }
  },
}
</script>

<style>
</style>