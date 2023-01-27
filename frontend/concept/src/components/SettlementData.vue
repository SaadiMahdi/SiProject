<template>
  <v-data-table :headers="headers" :items="this.settlments">
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New settlement
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="">Add Settlment</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="settlment.name" label="Dessert name" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="settlment.calories" label="Calories" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="settlment.fat" label="Fat (g)" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="settlment.carbs" label="Carbs (g)" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="settlment.protein" label="Protein (g)" outlined></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="close"> Cancel </v-btn>
              <v-btn color="primary" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="align-center">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions class="rounded-xl">
              <v-spacer></v-spacer>
              <v-btn color="primary " text @click="closeDelete">Cancel</v-btn>
              <v-btn color="primary " @click="deleteItemConfirm">OK</v-btn>
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
      <h3 class="secondary--text">No Products Yet?</h3>
      <p>Add products to your store and start selling to see products here</p>
      <v-btn color="primary" dark class="mb-2">
        New settlement
      </v-btn>
    </template>
  </v-data-table>
</template>


<script>
import axios from "axios";
export default {
  name: "SettlementData",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Vendor",
        align: "start",
        sortable: false,
        value: "facture.fournisseur",
      },
      { text: "Added The", value: "date" },
      { text: "Settlment ID", value: "_id" },
      { text: "Amount", value: "total" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    settlments: [],
    bills: [],
    vendors: [],
    editedIndex: -1,
    settlment: {
      id: "",
      date: "",
      facture:{
        fournisseur: "",
        prixAchat: 0,
        quantite: 0,
      },

    },
  }),

  computed: {
    //calcul du montant total de la facture
    total() {
      return this.settlments.reduce((total, settlment) => {
        return total + settlment.facture.reduce((subTotal, bill) => {
          return subTotal + bill.prixAchat;
        }, 0);
      }, 0);
    },  
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.getSettlment();
    this.getBill();
    this.getVendor();
    console.log(this.total)
  },

  methods: {
    getSettlment() {
      axios
        .get("http://localhost:3000/api/v1/reglement")
        .then((response) => {
          this.settlments = response.data.data.reglements;
          console.log(this.settlments)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBill() {
      axios
        .get("http://localhost:3000/api/v1/facture")
        .then((response) => {
          this.bills = response.data.data.factures;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getVendor() {
      axios.get('http://localhost:3000/api/v1/fournisseur')
        .then((response) => {
          this.vendors = response.data.data.fournisseurs;
        })
        .catch(error => {
          console.log(error)
        })
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.settlment = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.settlment = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.settlment = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.settlment = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.settlment);
      } else {
        this.desserts.push(this.settlment);
      }
      this.close();
    },
  },
};
</script>