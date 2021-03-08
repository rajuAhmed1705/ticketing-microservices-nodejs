<template>
<div>
  <v-data-table
    :headers="headers"
    :items="desserts"
    
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="d-flex align-center">
              <v-icon color="teal darken-2">mdi-garage</v-icon> Bank Details</v-toolbar-title
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
              New Bank Details
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Bank Details</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                 
                 <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="bankDetail.name"
                      label="Bank Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="bankDetail.branch"
                      label="Branch"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="bankDetail.country"
                      label="Country"
                    ></v-text-field>
                  </v-col>
                  <!--  -->
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
              <v-btn color="blue darken-1" text @click="save">
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
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
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
  </div>
</template>
<script>
import { mapActions } from "vuex";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      bankDetail:{
        name:'',
        branch:'',
        country:''
      },
      defaultBankDetail:{
        name:'',
        branch:'',
        country:''
      },
      headers: [
        
        { text: 'Bank Name', value: 'name' },
        { text: 'Branch', value: 'branch' },
        { text: 'Country', value: 'country' },
        
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      
      desserts: [],
      editedIndex: -1
      }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created() {
      this.initialize();
    },


     methods: {
       ...mapActions({addBank:"bank/addBank",removeBank: "bank/removeBank"}),
     saveBankData() {
       this.addBank(this.bankDetail);
       this.$notifier.showMessage({ content: "Hello, snackbar", color: "info" });
       this.bankDetail = Object.assign({}, this.defaultBankDetail);
       this.close();
     },
     deleteBankData(id) {
       this.removeBank(id);
     },
     updateBankData(){},
     initialize() {
       this.desserts = this.$store.getters['bank/bankDetails'];
      //  console.log(this.desserts);
    },



      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.bankDetail = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.bankDetail = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.bankDetail = Object.assign({}, this.defaultBankDetail)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.bankDetail = Object.assign({}, this.defaultBankDetail)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.bankDetail)
        } else {
          this.desserts.push(this.bankDetail)
        }
        this.close();
      
      },
     }
  }
</script>
<style></style>
