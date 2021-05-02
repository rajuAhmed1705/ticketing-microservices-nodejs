<template>
  <v-data-table
    :headers="headers"
    :items="leaveDetails"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        
        <v-toolbar-title>Leave Category</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Category
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-form v-model="valid" ref="form">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.name"
                        label="Category Name"
                        rules="required('name')"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.shortForm"
                        label="Short Form"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.section"
                        label="Section"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.allotedDays"
                        label="Alloted Days"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.minAvail"
                        label="Minimum Available"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.maxAvail"
                        label="Maximum Available"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.eligibleEmp"
                        label="Eligible Employee"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.carryForward"
                        label="Carry Forward"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <ReusableInput
                        v-model="leaveCategory.minService"
                        label="Minimum Service Required"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <ReusableInput
                        v-model="leaveCategory.yearly"
                        label="Yearly"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ReusableInput
                        v-model="leaveCategory.preApproval"
                        label="Pre-Approval"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ReusableInput
                        v-model="leaveCategory.maxAccumulation"
                        label="Maximum Accumulation"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ReusableInput
                        v-model="leaveCategory.payable"
                        label="Payable"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <ReusableInput
                        v-model="leaveCategory.adjustment"
                        label="Adjustment"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ReusableInput
                        v-model="leaveCategory.prefix"
                        label="Prefix"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ReusableInput
                        v-model="leaveCategory.suffix"
                        label="Suffix"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <ReusableInput
                        v-model="leaveCategory.intervention"
                        label="Intervention"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveCategoryData()"
                :disabled="!valid"
              >
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
                @click="deleteCategory(category.id)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Short Form", value: "shortForm" },
      { text: "Section", value: "section" },
      { text: "Alloted Days", value: "allotedDays" },
      { text: "Min Avail", value: "minAvail" },
      { text: "Max Avail", value: "maxAvail" },
      { text: "Eligible Employee type", value: "eligibleEmp" },
      { text: "Carry Forward", value: "carryForward" },
      { text: "Min Service", value: "minService" },
      { text: "Yearly", value: "yearly" },
      { text: "Pre-Approval", value: "preApproval" },
      { text: "Max Accumulation", value: "maxAccumulation" },
      { text: "Payment", value: "payment" },
      { text: "Adjustment", value: "adjustment" },
      { text: "Prefix", value: "prefix" },
      { text: "Suffix", value: "suffix" },
      { text: "Intervention", value: "intervention" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    leaveDetails: [],
    editedIndex: -1,
    defaultLeaveCategory: {
      name: "",
      shortForm: "",
      section: 0,
      allotedDays: 0,
      minAvail: 0,
      maxAvail: 0,
      eligibleEmp: "",
      carryForward: false,
      minService: 0,
      yearly: 0,
      preApproval: false,
      maxAccumulation: 0,
      payment: false,
      adjustment: false,
      prefix: "",
      suffix: "",
      intervention: "",
    },
    leaveCategory: {
      name: "",
      shortForm: "",
      section: 0,
      allotedDays: 0,
      minAvail: 0,
      maxAvail: 0,
      eligibleEmp: "",
      carryForward: false,
      minService: 0,
      yearly: 0,
      preApproval: true,
      maxAccumulation: 0,
      payment: false,
      adjustment: false,
      prefix: "",
      suffix: "",
      intervention: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item"
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.leaveDetails = [
        {
          name: "Casual Leave",
          shortForm: "CL",
          section: 115,
          allotedDays: 10,
          minAvail: 0,
          maxAvail: 10,
          eligibleEmp: "Permanent",
          carryForward: false,
          minService: 1,
          yearly: 10,
          preApproval: true,
          maxAccumulation: 0,
          payment: false,
          adjustment: false,
          prefix: "",
          suffix: "",
          intervention: "",
        },
        {
          name: "Sick Leave",
          shortForm: "SL",
          section: 116,
          allotedDays: 14,
          minAvail: 0,
          maxAvail: 14,
          eligibleEmp: "Permanent",
          carryForward: false,
          minService: 1,
          yearly: 14,
          preApproval: false,
          maxAccumulation: 0,
          payment: true,
          adjustment: true,
          prefix: "",
          suffix: "",
          intervention: "",
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.leaveDetails.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.leaveDetails.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.leaveDetails.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.leaveDetails[this.editedIndex], this.editedItem)
      } else {
        this.leaveDetails.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style>
</style>