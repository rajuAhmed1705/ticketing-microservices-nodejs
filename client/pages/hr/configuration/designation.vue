<template>
  <v-data-table :headers="headers" :items="allDeignations" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="d-flex align-center">
          <v-icon color="teal darken-2">mdi-account-box-outline</v-icon>
          Employee Designation</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
<<<<<<< HEAD
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Employee Designation
=======
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Designation 
>>>>>>> 088af27ecee617c4574dfad306e37a651f853073
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Employee Designation</span>
            </v-card-title>

            <v-form v-model="valid">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="designation.title"
                      label="Designation Name"
                      :rules="[required('title')]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="designation.level"
                      label="Designation Level"
                      :rules="[required('level')]"
                      type="number"
                      min="1" 
                      step="1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="designation.remark"
                      label="Remark"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveDesignation()">
                Save
              </v-btn>
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
                @click="deleteDesignation(designation.id)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
<<<<<<< HEAD
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
=======
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
>>>>>>> 088af27ecee617c4574dfad306e37a651f853073
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

<<<<<<< HEAD
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Level", value: "level" },
      { text: "Remark", value: "remark" },
=======
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      valid: false,
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Level', value: 'level' },
        { text: 'Remark', value: 'remark' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      designation: {
        title:'',
        level:'',
        remark:''
      },
      defaultdesignation: {
        title:'',
        level:'',
        remark:''
      },
      required(propertyType){
       return v => !!v || `${propertyType} is required` 
      },
    }),
>>>>>>> 088af27ecee617c4574dfad306e37a651f853073

      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    designation: {
      title: "",
      level: "",
      remark: "",
    },
    defaultdesignation: {
      title: "",
      level: "",
      remark: "",
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

<<<<<<< HEAD
  async created() {
    this.initialize()
    await this.fetchDesignation()
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Designation" : "Edit Designation"
=======
    methods: {
       ...mapActions({fetchDesignation:"designation/loadDesignation",
                      addDesignation:"designation/addDesignation",
                      removeDesignation: "designation/removeDesignation",
                      updateDesignaton:"designation/updateDesignaton"}),
     saveDesignation() {
       if (this.editedIndex > -1) {
          this.updateDesignaton(this.designation)
        } 
       else{
          this.addDesignation(this.designation);
          this.$notifier.showMessage({ content: "Congrats!Successfully added one value!", color: "success" });
          this.designation = Object.assign({}, this.defaultdesignation);
            }
       this.close();
       },
     deleteDesignation(id) {
       this.removeDesignation(id);
       this.closeDelete()
     },
     initialize() {
        this.$store.getters['designation/designations'];
>>>>>>> 088af27ecee617c4574dfad306e37a651f853073
    },
    ...mapGetters({
      allDeignations: "designation/designations",
    }),
  },

  methods: {
    ...mapActions({
      fetchDesignation: "designation/loadDesignation",
      addDesignation: "designation/addDesignation",
      removeDesignation: "designation/removeDesignation",
      updateDesignaton: "designation/updateDesignaton",
    }),
    saveDesignation() {
      if (this.editedIndex > -1) {
        this.updateDesignaton(this.designation)
      } else {
        this.addDesignation(this.designation)
        this.$notifier.showMessage({
          content: "Hello, snackbar",
          color: "info",
        })
        this.designation = Object.assign({}, this.defaultdesignation)
      }
      this.close()
    },
    deleteDesignation(id) {
      this.removeDesignation(id)
      this.closeDelete()
    },
    initialize() {
      this.$store.getters["designation/designations"]
    },

    editItem(item) {
      this.editedIndex = this.allDeignations.indexOf(item)
      this.designation = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.allDeignations.indexOf(item)
      this.designation = Object.assign({}, item)
      this.dialogDelete = true
    },

    // deleteItemConfirm () {
    //   this.allDeignations.splice(this.editedIndex, 1)
    //   this.closeDelete()
    // },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.designation = Object.assign({}, this.defaultdesignation)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.designation = Object.assign({}, this.defaultdesignation)
        this.editedIndex = -1
      })
    },

    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.designation)
    //   } else {
    //     this.desserts.push(this.designation)
    //   }
    //   this.close()
    // },
  },
}
</script>
