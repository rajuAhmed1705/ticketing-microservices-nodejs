<template>
  <v-app dark>
    <Snackbar />
    <Sidebar />
    <Navbar :title="title" />
    <!-- router view -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- router view -->
    <Footer />
  </v-app>
</template>

<script>
export default {
  data: ()=>{
    return{
      title: 'shurjoERP'
    }
  }
}
</script>
<style>
.v-main{
  background: #faf4ff;
}
.nuxt{
background:#faf4ff;
}
</style>
