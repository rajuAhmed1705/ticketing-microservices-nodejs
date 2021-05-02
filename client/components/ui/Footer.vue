<template>
  <div>
    <v-footer :absolute="fixed" app dark color="teal darken-4">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fixed: true,
    }
  },
  // mounted() {
  //   this.$bus.$on("toggleFixed", fixed => {
  //     this.fixed = fixed;
  //   });
  // }
}
</script>
<style lang=""></style>
