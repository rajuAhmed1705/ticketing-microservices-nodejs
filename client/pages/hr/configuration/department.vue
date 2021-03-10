<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allDepartments"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="d-flex align-center">
            <v-icon color="teal darken-2">mdi-file-document</v-icon>Department
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >New Department</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Department Details</span>
              </v-card-title>

              <v-form v-model="valid">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="department.title"
                        label="Department Name"
                        :rules="[required('title')]"
                        
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="department.code"
                        label="Code"
                        type="number"
                        min="1" 
                        step="1"
                        :rules="[required('code')]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="department.remark"
                        label="Remark"
                      ></v-text-field>
                    </v-col>
                    <!--  -->
                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveDepartmentData()" :disabled="!valid"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteDepartment(department.id)"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- prettier-ignore -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="warning" class="mr-2" @click=" editItem (item) ">mdi-pencil</v-icon>
        <v-icon small color="red" class="" @click="deleteItem (item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"

// import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  
  data: () => ({
    dialog: false,
    dialogDelete: false,
    valid: false,
    
    department: {
      title: "",
      code: "",
      remark: "",
    },
    defaultdepartment: {
      title: "",
      code: "",
      remark: "",
    },
    headers: [
      { text: "Department Name", value: "title" },
      { text: "Code", value: "code" },
      { text: "Remark", value: "remark" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    
    required(propertyType){
       return v => !!v || `${propertyType} is required` 

    },

    editedIndex: -1,
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async created() {
    this.initialize()
    await this.fetchDepartmnt()
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Department" : "Edit Department Info"
    },
    ...mapGetters({
      allDepartments: "department/departments",
    }),
  },
  beforeMounted() {
    this.$store.dispatch("loadDepartment")
    //  this.departmentTest()
  },

  methods: {
    ...mapActions({
      fetchDepartmnt: "department/loadDepartment",
      removeDepartment: "department/removeDepartment",
      addDepartment: "department/addDepartment",
      updateDepartment: "department/updateDepartment",
    }),
    deleteDepartment(id) {
      // console.log(id);
      this.removeDepartment(id)
      //  this.department = Object.assign({}, department)
      this.closeDelete()
      //  this.dialogDelete = true
    },
    saveDepartmentData() {
      if (this.editedIndex > -1) {
        // Object.assign(this.allDepartments[this.editedIndex], this.department)
        // console.log("hello")
        this.updateDepartment(this.department)
      } else {
        this.addDepartment(this.department)
        this.$notifier.showMessage({
          content: "Congrats!Successfully added one value!",
          color: "success",
        })
        this.department = Object.assign({}, this.defaultdepartment)
      }
      this.close()
    },

    initialize() {
      this.$store.getters["department/departments"]
    },

    editItem(item) {
      this.editedIndex = this.allDepartments.indexOf(item)
      this.department = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.allDepartments.indexOf(item)
      this.department = Object.assign({}, item)
      this.dialogDelete = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.department = Object.assign({}, this.defaultdepartment)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.department = Object.assign({}, this.defaultdepartment)
        this.editedIndex = -1
      })
    },
  },
}
</script>
<style></style>
