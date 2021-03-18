<template>
  <div>
    <v-data-table :headers="headers" :items="allProjects" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="d-flex align-center">
            <v-icon color="teal darken-2">mdi-folder-plus</v-icon>Project Details
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Project Details</span>
              </v-card-title>

              <v-form v-model="valid" ref="form">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="project.name" label="Project name" :rules="[required('name')]"></v-text-field>
                    </v-col>
                    <!--  -->
                  </v-row>
                  <v-row>
                    <!-- date -->
                    <v-col cols="12" sm="12" md="12">
                      <v-menu
                        v-model="startingDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="project.startingDate"
                            label="Starting Date"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            :value="fromDateDisp"
                            v-on="on"
                            required
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          locale="en-in"
                          v-model="project.startingDate"
                          no-title
                          @input="startingDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-menu
                        v-model="endDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="project.endDate"
                            label="Ending Date"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            :value="fromDateDisp"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          locale="en-in"
                          v-model="project.endDate"
                          no-title
                          @input="endDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="project.remark" label="Remark"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveProjectData()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteProject(project.id)">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" color="warning" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="deleteItem (item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    startingDate: false,
    endDate: false,
    valid:false,
    dialog: false,
    dialogDelete: false,
    project: {
      name: "",
      startingDate: "",
      endDate: "",
      remark: "",
    },
    defaultProject: {
      name: "",
      startingDate: "",
      endDate: "",
      remark: "",
    },
    headers: [
      {
        text: "Project Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Project Starting Date", value: "startingDate" },
      { text: "Project Ending Date", value: "endDate" },
      { text: "Remark", value: "remark" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    required(propertyType){
       return v => v && v.length>0 || `${propertyType} is required` 
      },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    this.initialize();
    await this.fetchProject();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Project" : "Edit Project Info";
    },
    fromDateDisp() {
      console.log("hello1");
      return moment(this.project.startingDate).format('MMMM Do YYYY')
      // format/do something with date
    },
    ...mapGetters({
      allProjects: "projectName/projects",
    }),
  },
  beforeMounted() {
    this.$store.dispatch("loadProject");
  },

  methods: {
    // fromDateDisp() {
    //   console.log("hi")
    //   return this.project.startingDate;
    //   // format/do something with date
    // },
    // fromDateDisp() {
    //   console.log("hi")
    //   return this.project.endDate;
    //   // format/do something with date
    // },
    ...mapActions({
      fetchProject: "projectName/loadProject",
      addProject: "projectName/addProject",
      removeProject: "projectName/removeProject",
      updateProject: "projectName/updateProject",
    }),
    saveProjectData() {
      if (this.editedIndex > -1) {
        // console.log("hello")
        this.updateProject(this.project);
        this.$notifier.showMessage({
          content: "Congrats!Successfully updated one value!",
          color: "warning",
        });
      } else {
        this.$refs.form.resetValidation() 
        this.addProject(this.project);
        this.$notifier.showMessage({
          content: "Congrats!Successfully added one value!",
          color: "success",
        });
        this.project = Object.assign({}, this.defaultProject);
      }
      this.close();
    },
    deleteProject(id) {
      this.removeProject(id);
      this.$notifier.showMessage({
          content: "Congrats!Successfully deleted one value!",
          color: "red",
        });
      this.closeDelete();
    },
    initialize() {
      this.$store.getters["projectName/projects"];
      //  console.log(this.allProjects);
    },

    editItem(item) {
      this.editedIndex = this.allProjects.indexOf(item);
      this.project = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allProjects.indexOf(item);
      this.project = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.allProjects.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.$refs.form.resetValidation() 
      this.dialog = false;
      this.$nextTick(() => {
        this.project = Object.assign({}, this.defaultProject);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.project = Object.assign({}, this.defaultProject);
        this.editedIndex = -1;
      });
    },

    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.project)
    //   } else {
    //     this.desserts.push(this.project)
    //   }
    //   this.close();

    // },
  },
};
</script>
<style></style>
