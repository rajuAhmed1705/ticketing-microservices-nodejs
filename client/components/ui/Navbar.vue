<template>
  <div>
    <v-app-bar flat fixed app color="teal darken-3" dark>
      <v-app-bar-nav-icon @click.stop="toggleDrawer()" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>

      <!-- notofication -->
      <v-tab>
        <v-badge color="green" content="6" offset-x="30" offset-y="20">
          <v-avatar size="40" class="mr-5">
            <v-icon @click="showDialog = true">mdi-alarm-light</v-icon>
          </v-avatar>
        </v-badge>
      </v-tab>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar size="40">
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>

              <!-- <span class="white--text headline">{{ user.initials }}</span> -->
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text headline">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Edit Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Disconnect </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>

      <!-- end profile -->
    </v-app-bar>
  </div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {
      dialog: false,
    }
  },
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
  }),
  methods: {
    toggleDrawer() {
      this.$bus.$emit("toggleDrawer", this.drawer)
      return (this.drawer = !this.drawer)
    },
  },
}
</script>

