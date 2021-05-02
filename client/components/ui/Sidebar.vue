<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
      color="teal darken-2"
    >
    
      <v-list dense expand nav rounded>
        <!-- ENTIRE list is wrapped in a template -->
        <template v-for="(item, i) in routes">
          <!-- use v-if to determine if 2nd level nesting is needed -->
          <!-- if it's a menu item with no children -->
         
          <v-list-item
            v-if="!item.children"
            color="white"
            :key="`subheader-${i}`"
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ `mdi-${item.meta.icon}` }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
       
          <!-- else if it has children -->
          <v-list-group
            v-else
            :group="item.path"
            :key="item.name"
            color="white"
          >
            <!-- this template is for the title of top-level items with children -->
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon>{{ `mdi-${item.meta.icon}` }}</v-icon>
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <!-- this template is for the children/sub-items (2nd level) -->
            <template v-for="(subItem, j) in item.children">
              <!-- another v-if to determine if there's a 3rd level -->
              <!-- if there is NOT a 3rd level -->
              <v-list-item
                v-if="!subItem.children"
                class="ml-5"
                :key="`subheader-${j}`"
                :to="subItem.path"
              >
                <v-list-item-icon class="ml-4">
                  <v-icon v-text="`mdi-${subItem.meta.icon}`" />
                </v-list-item-icon>
                <v-list-item-title class="ml-0">
                  {{ subItem.name }}
                </v-list-item-title>
              </v-list-item>
              <!-- if there is a 3rd level -->
              <v-list-group
                v-else
                :key="subItem.name"
                color="white"
                :group="subItem.path"
                sub-group
              >
                <template #activator>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon>{{ `mdi-${subItem.meta.icon}` }}</v-icon>
                      {{ subItem.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-for="(subSubItem, k) in subItem.children">
                  <v-list-item
                    :key="`subheader-${k}`"
                    color="white"
                    :value="true"
                    :to="subSubItem.path"
                  >
                    <v-list-item-icon>
                      <v-icon>{{ `mdi-${subSubItem.meta.icon}` }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ subSubItem.name }}</v-list-item-title>
                  </v-list-item>
                </template>
              </v-list-group>
            </template>
          </v-list-group>
        </template>
      </v-list>
     
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      miniVariant: false,
      routes: [
        {
          name: "Welcome",
          path: "/",
          meta: {
            icon: "apps",
          },
        },
        {
          name: "Human Resources",
          // path: "/hr/masterDB",
          meta: {
            icon: "account-box",
          },
          children: [
            {
              name: "Master Database",
              path: "/hr/masterDB2",
              meta: {
                icon: "database",
              },
            },
            {
              name: "Configuration",
              // path: "/hr/config",
              meta: {
                icon: "map",
              },
              children: [
                {
                  name: "Project Name",
                  path: "/hr/configuration/projectname",
                  meta: {
                    icon: "folder-plus",
                  },
                },
                {
                  name: "Department",
                  path: "/hr/configuration/department",
                  meta: {
                    icon: "file-document",
                  },
                },
                {
                  name: "Confirmation Rule",
                  path: "/hr/configuration/rule",
                  meta: {
                    icon: "clipboard-check",
                  },
                },
                {
                  name: "Bank",
                  path: "/hr/configuration/bank",
                  meta: {
                    icon: "garage",
                  },
                },
                {
                  name: "Employee Type",
                  path: "/hr/configuration/employeeType",
                  meta: {
                    icon: "account-multiple",
                  },
                },
                {
                  name: "Employee Status",
                  path: "/hr/configuration/employeeStatus",
                  meta: {
                    icon: "account-check",
                  },
                },
                {
                  name: "Designation",
                  path: "/hr/configuration/designation",
                  meta: {
                    icon: "account-box-outline",
                  },
                },
                {
                  name: "Religion",
                  path: "/hr/configuration/religion",
                  meta: {
                    icon: "church",
                  },
                },
                // {
                //   name: "Marital Status",
                //   path: "/hr/bank",
                //   meta: {
                //     icon: "pasta"
                //   }
                // },
                {
                  name: "Language",
                  path: "/hr/configuration/language",
                  meta: {
                    icon: "text-to-speech",
                  },
                },
                {
                  name: "Type of Turnover",
                  path: "/hr/configuration/typeOfTurnover",
                  meta: {
                    icon: "account-reactivate",
                  },
                },
                {
                  name: "Skills",
                  path: "/hr/configuration/skill",
                  meta: {
                    icon: "head-cog-outline",
                  },
                },
                {
                  name: "Educational Level",
                  path: "/hr/configuration/educationalLevel",
                  meta: {
                    icon: "school",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "Leave Management",
          meta: {
            icon: "account-settings",
          },
          children: [
            {
                  name: "Dashboard",
                  path: "/leave/leaveDashboard",
                  meta: {
                    icon: "view-dashboard-variant",
                  },
                },
                {
                  name: "Leave Application",
                  path: "/leave/leaveApplication",
                  meta: {
                    icon: "application",
                  },
                },
                {
                  name: "Leave Profile",
                  path: "/leave/leaveProfile",
                  meta: {
                    icon: "account-clock",
                  },
                },
                {
                  name: "Leave Report",
                  path: "/leave/leaveReport",
                  meta: {
                    icon: "file-chart",
                  },
                },
            {
              name: "Configuration",
              meta: {
                icon: "tune",
              },
              children: [
                {
                  name: "Leave Category",
                  path: "/leave/configuration/leaveCategory",
                  meta: {
                    icon: "shape",
                  },
                },
                {
                  name: "Holidays",
                  path: "/leave/configuration/holidays",
                  meta: {
                    icon: "beach",
                  },
                },
                
              ],
            },
          ],
        },
      ],
    }
  },
  mounted() {
    this.$bus.$on("toggleDrawer", (drawer) => {
      this.drawer = drawer
    })
    this.$bus.$on("toggleMiniVariant", (miniVariant) => {
      this.miniVariant = miniVariant
    })
    this.$bus.$on("toggleClipped", (clipped) => {
      this.clipped = clipped
    })
  },
}
</script>
