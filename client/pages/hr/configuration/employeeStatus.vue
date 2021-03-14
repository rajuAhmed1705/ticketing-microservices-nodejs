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
              New
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Employee Status</span>
            </v-card-title>
            
            <v-form v-model="valid" ref="form">
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
                     :rules="[required('status')]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            </v-form>

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
                :disabled="!valid"
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
        color="warning"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="red"
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
      valid: false,
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
      required(propertyType){
       return v => v && v.length>0 || `${propertyType} is required` 
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
       this.$refs.form.resetValidation() 
       this.addEmpSts(this.employeeStatus);
       this.$notifier.showMessage({ content: "Congrats!Successfully added one value!", color: "success" });
       this.employeeStatus = Object.assign({}, this.defaultemployeeStatus);
      }
       this.close();
     },
     deleteEmployeeSts(id) {
       this.removeEmpSts(id);
       this.$notifier.showMessage({ content: "Congrats!Successfully deleted one value!", color: "red" });
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

      close () {
        this.$refs.form.resetValidation() 
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
    },
  }
</script>