<template>
  <v-data-table :headers="headers" :items="allReligions" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="d-flex align-center">
          <v-icon color="teal darken-2">mdi-church</v-icon>Religion
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Religion Type</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Religion Type</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="religion.name" label="Religion"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click=" saveReligionData()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteReligionData(religion.id)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Religion Name",
        align: "start",
        sortable: false,
        value: "name",
      },

      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    religion: {
      name: "",
    },
    defaultreligion: {
      name: "",
    },
    // typeOfEmployee: ["Permanent", "Full-Time", "Contructual","Probationary","Apprentice"]
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
    await this.fetchReligion();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Religion" : "Edit Religion Info";
    },
    ...mapGetters({
      allReligions: "religion/religions",
    }),
  },
  beforeMounted() {
    this.$store.dispatch("loadReligion");
  },

  methods: {
    ...mapActions({
      fetchReligion: "religion/loadReligion",
      addReligion:"religion/addReligion",
      removeReligion:"religion/removeReligion",
      updateReligion:"religion/updateReligion"
    }),
    saveReligionData() {
      if (this.editedIndex > -1) {
        this.updateReligion(this.religion);
      } else {
        this.addReligion(this.religion);
        this.$notifier.showMessage({
          content: "Hello, snackbar",
          color: "info",
        });
        this.rule = Object.assign({}, this.defaultreligion);
      }
      this.close();
    },
    deleteReligionData(id) {
      this.removeReligion(id);
      this.closeDelete();
    },

    initialize() {
      this.$store.getters["religion/religions"];
    },

    editItem(item) {
      this.editedIndex = this.allReligions.indexOf(item);
      this.religion = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allReligions.indexOf(item);
      this.religion = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.allReligions.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.religion = Object.assign({}, this.defaultreligion);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.religion = Object.assign({}, this.defaultreligion);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.religion);
      } else {
        this.desserts.push(this.religion);
      }
      this.close();
    },
  },
};
</script>