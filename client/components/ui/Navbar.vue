<template>
  <div>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="toggleDrawer()" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>

      <!-- notofication -->
      <v-tab>
        <v-badge
          color="green"
          content="6"
          offset-x="30"
          offset-y="20"
        >
          <v-avatar size="40" class="mr-5">
          <v-icon @click="showDialog = true">mdi-alarm-light</v-icon>
        </v-avatar>
        </v-badge>
      </v-tab>
  
  <!-- <div>
    
  <v-tab>
        <v-badge
          color="green"
          content="6"
          offset-x="30"
          offset-y="20"
        >
          <v-avatar size="40" class="mr-5">
          <v-icon @click="showDialog = true">mdi-alarm-light</v-icon>
        </v-avatar>
        </v-badge>
      </v-tab>
      

            <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-divider></v-divider>
        

      
      </v-card>

      
  </div> -->


  <!-- <div class="">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-tab>
        <v-badge
          color="green"
          content="6"
          offset-x="30"
          offset-y="20"
        >
          <v-avatar size="40" class="mr-5">
          <v-icon v-bind="attrs"
          v-on="on">mdi-alarm-light</v-icon>
        </v-avatar>
        </v-badge>
      </v-tab>
      </template>

      <v-card>
            <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="green--text"
        multiple
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                ></v-list-item-subtitle>

                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div> -->


<!-- end of notification -->
      <!--short profile -->
     
      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar size="40" >
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        
              <!-- <span class="white--text headline">{{ user.initials }}</span> -->
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="white--text headline">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Disconnect
              </v-btn>
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
data () {
      return {
        dialog: false,
      }
    },
  data: () => ({
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
    }),
  methods: {
    toggleDrawer() {
      this.$bus.$emit("toggleDrawer", this.drawer);
      return (this.drawer = !this.drawer);
    },
     
  },

  

};
</script>
<style lang=""></style>
