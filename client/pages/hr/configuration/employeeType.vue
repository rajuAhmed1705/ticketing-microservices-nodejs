<template>
  <v-data-table
    :headers="headers"
    :items="allEmpTypes"
   
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="d-flex align-center">
              <v-icon color="teal darken-2">mdi-account-multiple</v-icon> Employee Type</v-toolbar-title
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
              New Employee Type
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Employee Type</span>
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
                      v-model="employeetype.name"
                      label="Employee Type"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-text-field
                       v-model="employeetype.remark"
                       label="Remark"
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
                @click="saveEmpTypeData()"
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
              <v-btn color="blue darken-1" text @click=" deleteEmpTypeData(employeetype.id)">OK</v-btn>
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
        {
          text: 'Employee Type',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Remark', value: 'remark' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      
      editedIndex: -1,
      employeetype: {
        
        name:'',
        remark:''
      },
      defaultemployeetype: {
      
        name:'',
        remark:''
      },
      // typeOfEmployee: ["Permanent", "Full-Time", "Contructual","Probationary","Apprentice"]
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
      await this.fetchEmpType()
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New EmpType' : 'Edit EmpType'
      },
    ...mapGetters({
      allEmpTypes:"employeeType/employeetypes"
    })
    },
    beforeMounted(){
      this.$store.dispatch("loadEmpType")
    },
    methods: {
       ...mapActions({fetchEmpType:"employeeType/fetchEmpType",
                      addEmpType:"employeeType/addEmpType",
                      removeEmpType: "employeeType/removeEmpType",
                      updateEmpType:"employeeType/updateEmpType"}),
     saveEmpTypeData() {
        if (this.editedIndex > -1) {
        this.updateEmpType(this.employeetype);
      } else {
       this.addEmpType(this.employeetype);
       this.$notifier.showMessage({ content: "Hello, snackbar", color: "info" });
       this.employeetype = Object.assign({}, this.defaultemployeetype);
      }
       this.close();
     },
     deleteEmpTypeData(id) {
       this.removeEmpType(id);
     },
     initialize() {
       this.$store.getters['employeeType/employeetypes'];
      //  console.log(this.desserts);
    },

      editItem (item) {
        this.editedIndex = this.allEmpTypes.indexOf(item)
        this.employeetype = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.allEmpTypes.indexOf(item)
        this.employeetype = Object.assign({}, item)
        this.dialogDelete = true
      },


      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.employeetype = Object.assign({}, this.defaultemployeetype)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.employeetype = Object.assign({}, this.defaultemployeetype)
          this.editedIndex = -1
        })
      },
    },
  }
</script>