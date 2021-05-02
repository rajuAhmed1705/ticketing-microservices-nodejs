<template>
   <v-file-input small-chips multiple :label="label">
        </v-file-input>
</template>

<script>
export default {
    props:{
        label:{
            type:String,
            default: 'Add File'
        }
    }

}
</script>

<style>

</style>