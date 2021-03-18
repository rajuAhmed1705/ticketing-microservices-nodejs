<template>
  <div>
    <v-data-table :headers="headers" :items="allRules" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="d-flex align-center">
            <v-icon color="teal darken-2">mdi-clipboard-check</v-icon>Confirmation Rule
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Rule</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Rule Details</span>
              </v-card-title>
              
              <v-form v-model="valid" ref="form">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="rule.ruleName" label="Rule Name" :rules="[required('ruleName')]"></v-text-field>
                    </v-col>
                    <!--  -->
                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveRuleData()" :disabled="!valid">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteRuleData(rule.id)">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="warning" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
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
    dialog: false,
    dialogDelete: false,
    valid: false,
    rule: {
      ruleName: "",
    },
    defaultrule: {
      ruleName: "",
    },
    headers: [
      { text: "Rule Name", value: "ruleName" },

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
    // console.log("hello");
    await this.fetchRule();
    // console.log(this.fetchRule());
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Rule" : "Edit Rule Info";
    },
    ...mapGetters({
      allRules: "rule/rules",
    }),
  },
  beforeMounted() {
    this.$store.dispatch("loadRule");
  },
  methods: {
    ...mapActions({
      fetchRule: "rule/loadRule",
      addRule: "rule/addRule",
      removeRule: "rule/removeRule",
      updateRule: "rule/updateRule",
    }),
    saveRuleData() {
      if (this.editedIndex > -1) {
        this.updateRule(this.rule);
      } else {
        this.$refs.form.resetValidation()
        this.addRule(this.rule);
        this.$notifier.showMessage({
          content: "Congrats!Successfully added one value!",
          color: "success",
        });
        this.rule = Object.assign({}, this.defaultrule);
      }
      this.close();
    },
    deleteRuleData(id) {
      this.removeRule(id);
      this.$notifier.showMessage({
          content: "Congrats!Successfully deleted one value!",
          color: "red",
        });
      this.closeDelete();
    },

    initialize() {
      this.$store.getters["rule/rules"];
      // console.log("h");
    },

    editItem(item) {
      this.editedIndex = this.allRules.indexOf(item);
      this.rule = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.allRules.indexOf(item);
      this.rule = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.allRules.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.rule = Object.assign({}, this.defaultrule);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.rule = Object.assign({}, this.defaultrule);
        this.editedIndex = -1;
      });
    },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.rule);
    //   } else {
    //     this.desserts.push(this.rule);
    //   }
    //   this.close();
    // },
  },
};
</script>
<style></style>
