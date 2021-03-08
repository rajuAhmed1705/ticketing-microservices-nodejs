<template>
  <v-data-table :headers="headers" :items="allTurnovers" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="d-flex align-center">
          <v-icon color="teal darken-2">mdi-account-reactivate</v-icon>Employee Type
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Turnover Type</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">TurnOver Type</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="turnovertype.name" label="TurnOver Type"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="saveTurnOverData()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteTurnOverData(turnovertype.id)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
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
      { text: "TurnOver Type", value: "name" },

      { text: "Actions", value: "actions", sortable: false },
    ],

    editedIndex: -1,
    turnovertype: {
      name: "",
    },
    defaultturnovertype: {
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
    await this.fetchTurnover();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Turnover" : "Edit Turnover Info";
    },
    ...mapGetters({
      allTurnovers: "typeofturnover/turnovertypes",
    }),
  },
  beforeMounted() {
    this.$store.dispatch("loadTurnover");
  },

  methods: {
    ...mapActions({
      fetchTurnover: "typeofturnover/loadTurnover",
      addTurnOver: "typeofturnover/addTurnOver",
      removeTurnOver: "typeofturnover/removeTurnOver",
      updateTurnOver: "typeofturnover/updateTurnOver",
    }),
    saveTurnOverData() {
      if (this.editedIndex > -1) {
        // console.log("hello");
        this.updateTurnOver(this.turnovertype);
      } else {
        this.addTurnOver(this.turnovertype);
        this.$notifier.showMessage({
          content: "Hello, snackbar",
          color: "info",
        });
        this.employeetype = Object.assign({}, this.defaultturnovertype);
      }
      this.close();
    },
    deleteTurnOverData(id) {
      this.removeTurnOver(id);
      this.closeDelete();
    },
    initialize() {
      this.$store.getters["typeofturnover/turnovertypes"];
    },

    editItem(item) {
      this.editedIndex = this.allTurnovers.indexOf(item);
      this.turnovertype = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allTurnovers.indexOf(item);
      this.turnovertype = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.allTurnovers.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.turnovertype = Object.assign({}, this.defaultturnovertype);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.turnovertype = Object.assign({}, this.defaultturnovertype);
        this.editedIndex = -1;
      });
    },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.employeetype);
    //   } else {
    //     this.desserts.push(this.employeetype);
    //   }
    //   this.close();
    // },
  },
};
</script>