<template>
<div>
  <v-data-table
    :headers="headers"
    :items="allBanks"
    
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
              New 
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
                      v-model="bankDetail.bankName"
                      label="Bank Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="bankDetail.accountName"
                      label="Account Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="bankDetail.accountNumber"
                      label="Account Number"
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
              <v-btn color="blue darken-1" text @click="saveBankData()">
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
          <v-icon small color="warning" class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            small
            color="red"
            @click="deleteBankData(bankDetail.id)"
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
import { mapActions,mapGetters } from "vuex";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      bankDetail:{
        bankName:'',
        accountName:'',
        accountNumber:''
      },
      defaultBankDetail:{
        bankName:'',
        accountName:'',
        accountNumber:''
      },
      headers: [
        
        { text: 'Bank Name', value: 'bankName' },
        { text: 'Account Name', value: 'accountName' },
        { text: 'Account Number', value: 'accountNumber' },
        
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1
      }),

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    async created() {
      this.initialize();
      await this.fetchBank()
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Bank' : 'Edit Bank'
      },
      ...mapGetters({
        allBanks:"bank/bankDetails"
      })
    },
    beforeMounted(){
      this.$store.dispatch("loadBank")
    },
     methods: {
       ...mapActions({fetchBank:"bank/loadBank",
                      addBank:"bank/addBank",
                      removeBank:"bank/removeBank",
                      updateBank:"bank/updateBank"}),
     saveBankData() {
       if (this.editedIndex > -1) {
        this.updateBank(this.bankDetail)
      } else {
       this.addBank(this.bankDetail);
       this.$notifier.showMessage({ content: "Congrats!Successfully added one value!",
          color: "success", });
       this.bankDetail = Object.assign({}, this.defaultBankDetail);
      }
       this.close();
     },
     deleteBankData(id) {
       this.removeBank(id);
       this.$notifier.showMessage({
          content: "Congrats!Successfully deleted one value!",
          color: "red",
        })
      this.closeDelete()
     },
     updateBankData(){},
     initialize() {
        this.$store.getters['bank/bankDetails'];
    },



      editItem (item) {
        this.editedIndex = this.allBanks.indexOf(item)
        this.bankDetail = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.allBanks.indexOf(item)
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
          Object.assign(this.allBanks[this.editedIndex], this.bankDetail)
        } else {
          this.allBanks.push(this.bankDetail)
        }
        this.close();
      
      },
     }
  }
</script>
<style></style>
