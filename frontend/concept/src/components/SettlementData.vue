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
                  
                    <v-dialog
                        ref="dialog"
                        v-model="modal"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="settlment.date"
                            format="dd/MM/yyyy"
                            label="Insert Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="settlment.date"
                          scrollable
                          format="dd/MM/yyyy"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(settlment.date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    <v-select
                      v-model="settlment.facture"
                      label="Facture"
                      :items="bills"
                      item-text="_id"
                      item-value="facture.id"
                    ></v-select>
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
              <v-btn color="primary " @click="deleteItemConfirm(selectedId)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item._id)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item._id)"> mdi-delete </v-icon>
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
    modal: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Vendor",
        align: "start",
        sortable: false,
        value: "facture.fournisseur.name",
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


  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  computed: {
    caluclTotal() {
      return this.bills.reduce((acc, bill) => {
        return acc + bill.prixAchat * bill.quantite;
      }, 0);
    },
    },

  mounted() {
    this.getSettlment();
    this.getBill();
    this.getVendor();
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

    InsertItem(item) {
      this.dialog = true;
    },
    editItem(id) {
      this.dialogEdit = true;
      this.selectedId = id;
    },
    edit(id) {
      axios.patch("http://localhost:3000/api/v1/reglement/" + id, this.settlment);
      this.closeEdit();
      this.getSettlment();
      this.$forceUpdate();
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },

    deleteItemConfirm(id) {
      axios.delete("http://localhost:3000/api/v1/reglement/" + id);
      this.closeDelete();
      this.getSettlment();
      this.$forceUpdate();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },
    closeEdit() {
      this.dialogEdit = false;
    },

    save() {
      console.log(this.settlment)
      axios
        .post("http://localhost:3000/api/v1/reglement/", this.settlment)
        .then((response) => {
          console.log(response.data);
          this.getSettlment();
          this.$forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
      this.getSettlment();
      this.$forceUpdate();
    },
  },
};
</script>