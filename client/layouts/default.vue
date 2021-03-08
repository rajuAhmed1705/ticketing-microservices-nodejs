<template>
  <v-app dark>
    <Snackbar />
    <SideBar />
    <NavBar :title="title" />
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
import Snackbar from "~/components/Snackbar.vue";
import SideBar from "~/components/ui/Sidebar";
import Footer from "~/components/ui/Footer";
import NavBar from "~/components/ui/Navbar";
export default {
  components: {
    SideBar,
    Footer,
    NavBar,
    Snackbar
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "shurjoERP"
    };
  }
};
</script>
