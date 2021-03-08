<template>
  <v-data-table
    :headers="headers"
    :items="allStatuses"
    
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="d-flex align-center">
              <v-icon color="teal darken-2">mdi-account-check</v-icon> Employee Status</v-toolbar-title
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
              New Employee Status
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Employee Status</span>
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
                      v-model="employeeStatus.status"
                      label="Employee Status"
                    ></v-text-field>
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
                @click="saveEmployeeSts()"
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
              <v-btn color="blue darken-1" text @click="deleteEmployeeSts(employeeStatus.id)">OK</v-btn>
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
import { mapActions,mapGetters } from "vuex";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        
        { text: 'Status', value: 'status' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      employeeStatus: {
        status:''
      },
      defaultemployeeStatus: {
        status:''
      },
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
      await this.fetchEmpstatus()
    },
   computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New employeeStatus' : 'Edit employeeStatus'
      },
      ...mapGetters({
      allStatuses: "employeeStatus/employeestatus",
    }),
    },
    beforeMounted(){
      this.$store.dispatch("loadEmpstatus");
    },
    methods: {
       ...mapActions({fetchEmpstatus:"employeeStatus/loadEmpstatus",
                      addEmpSts:"employeeStatus/addEmpSts",
                      removeEmpSts: "employeeStatus/removeEmpSts",
                      updateEmpSts:"employeeStatus/updateEmpSts"}),
     saveEmployeeSts() {
       if (this.editedIndex > -1) {
        this.updateEmpSts(this.employeeStatus);
      } else {
       this.addEmpSts(this.employeeStatus);
       this.$notifier.showMessage({ content: "Hello, snackbar", color: "info" });
       this.employeeStatus = Object.assign({}, this.defaultemployeeStatus);
      }
       this.close();
     },
     deleteEmployeeSts(id) {
       this.removeEmpSts(id);
       this.closeDelete()
     },
     initialize() {
       this.$store.getters['employeeStatus/employeestatus'];
    },

      editItem (item) {
        this.editedIndex = this.allStatuses.indexOf(item)
        this.employeeStatus = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.allStatuses.indexOf(item)
        this.employeeStatus = Object.assign({}, item)
        this.dialogDelete = true
      },

      // deleteItemConfirm () {
      //   this.allStatuses.splice(this.editedIndex, 1)
      //   this.closeDelete()
      // },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.employeeStatus = Object.assign({}, this.defaultemployeeStatus)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.employeeStatus = Object.assign({}, this.defaultemployeeStatus)
          this.editedIndex = -1
        })
      },

      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.desserts[this.editedIndex], this.employeeStatus)
      //   } else {
      //     this.desserts.push(this.employeeStatus)
      //   }
      //   this.close()
      // },
    },
  }
</script>