<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
  
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="d-flex align-center">
              <v-icon color="teal darken-2">mdi-head-cog-outline</v-icon> Skills </v-toolbar-title
            >
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Skill
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">New Skill</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="skill.skillName"
                      label="Skill Name"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="6">
                                <v-select
                                  v-model="
                                    employeeStatus.empStatus
                                  "
                                  label="Status"
                                  :items="statusOfEmployee"
                                  
                                ></v-select>
                              </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from "vuex";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        // {
        //   text: 'Name',
        //   align: 'start',
        //   sortable: false,
        //   value: 'name',
        // },
        { text: 'Skill', value: 'skillName' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      skill: {
        skillName:''
      },
      defaultskill: {
        skillName:''
      },
      
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
       ...mapActions({addSkill:"skill/addSkill",removeSkill: "skill/removeSkill"}),
     saveSkillData() {
       this.addSkill(this.skill);
       this.$notifier.showMessage({ content: "Hello, snackbar", color: "info" });
       this.skill = Object.assign({}, this.defaultskill);
       this.close();
     },
     deleteSkillData(id) {
       this.removeSkill(id);
     },
     initialize() {
       this.desserts = this.$store.getters['skill/skills'];
      //  console.log(this.desserts);
    },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.skill = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.skill = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.skill = Object.assign({}, this.defaultskill)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.skill = Object.assign({}, this.defaultskill)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.skill)
        } else {
          this.desserts.push(this.skill)
        }
        this.close()
      },
    },
  }
</script>