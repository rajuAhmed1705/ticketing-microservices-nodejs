<template>
  <v-select
    :items="items"
    :label="label"
    class="field"
    :value="modelValue"
    v-bind="$attrs"
  ></v-select>
</template>

<script>
export default {
    props:{
        label:{
            type: String,
            default: ""
        },
        modelValue:{
            type: [String, Number],
            default:"",
        },
        items:{
            type: Array,
            default:[]
        }
    }
}
</script>

<style>
</style>