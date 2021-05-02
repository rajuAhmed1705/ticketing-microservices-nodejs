<template>
  <v-text-field 
  v-bind="$attrs"
  :label="label"
  :value="modelValue"
  class="field"
  @input="$emit('update: modelValue', $event.target.value)"
  >
   </v-text-field>
</template>

<script>
export default {
    props:{
        label:{
            default: "",
        },
        modelValue:{
            type:[String, Number,Boolean],
            default:""
        }
    }
}
</script>

<style>
</style>