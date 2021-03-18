<template>
  <v-data-table
    :headers="headers"
    :items="allEducationalLevels"
    
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="d-flex align-center">
              <v-icon color="teal darken-2">mdi-school</v-icon> Educational Level</v-toolbar-title
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
              New 
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Educational level</span>
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
                      v-model="educationalLevel.professionalQualification"
                      label="Qualification"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                  <v-text-field
                      v-model="educationalLevel.institution"
                      label="Institution">
                  </v-text-field>
                  </v-col>
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
                @click="saveEduLevelData()"
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
        @click="deleteEduLevel(educationalLevel.id)"
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
import { mapActions,mapGetters } from "vuex";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Qualification', value: 'professionalQualification' },
        { text: 'Institution', value: 'institution' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      educationalLevel: {
        professionalQualification:'',
        institution:''
      },
      defaulteducationalLevel: {
        professionalQualification:'',
        institution:''
      },
    //   statusOfEmployee: ["Active", "Inactive"]
    }),

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    async created () {
      this.initialize()
      await this.fetchEduLevel()
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      ...mapGetters({
        allEducationalLevels:"edulevel/educationalLevels"
      })
    },
    beforeMounted(){
      this.$store.dispatch("loadEduLevel")
    },

    methods: {
       ...mapActions({fetchEduLevel:"edulevel/loadEduLevel",
                      addEduLevel:"edulevel/addEduLevel",
                      removeEduLevel: "edulevel/removeEduLevel"}),
      //  addEduLevel:"educationalLevel/addEduLevel",removeEmpSts: "educationalLevel/removeEduLevel"
     saveEduLevelData() {
       this.addEduLevel(this.educationalLevel);
       this.$notifier.showMessage({ content: "Hello, snackbar", color: "info" });
       this.educationalLevel = Object.assign({}, this.defaulteducationalLevel);
       this.close();
     },
     deleteEduLevel(id) {
       this.removeEduLevel(id);
       this.$notifier.showMessage({
          content: "Congrats!Successfully deleted one value!",
          color: "red",
        })
      this.closeDelete()
     },
     initialize() {
        this.$store.getters['edulevel/educationalLevels'];
      //  console.log(this.allEducationalLevels);
    },

      editItem (item) {
        this.editedIndex = this.allEducationalLevels.indexOf(item)
        this.educationalLevel = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.allEducationalLevels.indexOf(item)
        this.educationalLevel = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.educationalLevel = Object.assign({}, this.defaulteducationalLevel)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.educationalLevel = Object.assign({}, this.defaulteducationalLevel)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.allEducationalLevels[this.editedIndex], this.educationalLevel)
        } else {
          this.desserts.push(this.educationalLevel)
        }
        this.close()
      },
    },
  }
</script>