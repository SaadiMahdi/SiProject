<template>
  
  <v-data-table :headers="headers" :items="bills.data.factures" sort-by="bills" >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Bill
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="">New Bill</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="bill.date"
                            label="Insert Date"
                            format="DD/MM/YYYY"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="bill.date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                </v-row>
                <v-row>
                  <v-select :items="vendors.data.fournisseurs" v-model="bill.fournisseur" label="fournisseur" outlined
                    return-object item-text="name" item-value="_id"></v-select> 
                  </v-row>
                  <v-row>
                    <v-select
                        :items="prod.data.produits"
                        v-model="bill.listeProduits"
                        label="Choose Products"
                        outlined
                        multiple
                        chips
                        return-object
                        item-text="designation"
                        item-value="_id"
                      ></v-select>
                      <v-container
                        v-for="produit in bill.listeProduits"
                        :key="produit"
                      >
                        <v-row>
                          <v-col>
                            <v-container>
                              <p>Product: {{ produit.designation }}</p>
                            </v-container>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="produit.quantite"
                              type="number"
                              label="Quantity"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="produit.prix"
                              type="number"
                              label="Price"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
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
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="">Edit Bill</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="bill.date"
                            label="Insert Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="bill.date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                </v-row>
                <v-row>
                  <v-select :items="vendors.data.fournisseurs" v-model="bill.fournisseur" label="fournisseur" outlined
                    return-object item-text="name" item-value="_id"></v-select> 
                  </v-row>
                  <v-row>
                    <v-select
                        :items="prod.data.produits"
                        v-model="bill.listeProduits"
                        label="Choose Products"
                        outlined
                        multiple
                        chips
                        return-object
                        item-text="designation"
                        item-value="_id"
                      ></v-select>
                      <v-container
                        v-for="produit in bill.listeProduits"
                        :key="produit"
                      >
                        <v-row>
                          <v-col>
                            <v-container>
                              <p>Product: {{ produit.designation }}</p>
                            </v-container>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="produit.quantite"
                              type="number"
                              label="Quantity"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="produit.prix"
                              type="number"
                              label="Price"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                  </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeEdit"> Cancel </v-btn>
              <v-btn color="primary" @click="edit(selectedId)"> Save </v-btn>
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
      <h3 class="secondary--text">No Bills Yet?</h3>
      <p>Add your newest Bills here</p>
      <v-btn color="primary" @click="InsertItem()"> Add Bill </v-btn>
    </template>
  </v-data-table>
</template>


<script>
import axios from 'axios';
export default {
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    selectedId: null,
    modal: false,
    headers: [
      {
        text: "Vendor",
        align: "start",
        sortable: false,
        value: "fournisseur.name",
      },
      { text: "Added The", value: "date" },
      { text: "Tracking id", value: "_id" },
      { text: "Number Of Products", value: "nbr_products" },
      { text: "Total", value: "total" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    bills: [],
    vendors: [],
    prod: [],
    editedIndex: -1,
    bill: {
      id: 0,
      date: null,
      fournisseur: "",
      listeProduits: [],
      nbr_products: 0,
      total:0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
    this.getBill();
    this.getVendor();
    this.getProduct();
    console.log(this.bills)
    console.log(this.bills.length);
  },

  methods: {
    getBill() {
      axios
        .get("http://localhost:3000/api/v1/facture")
        .then((response) => {
          this.bills = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getVendor() {
      axios.get('http://localhost:3000/api/v1/fournisseur')
        .then((response) => {
          this.vendors = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getProduct() {
      axios.get('http://localhost:3000/api/v1/produit')
        .then((response) => {
          this.prod = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    InsertItem(item) {
      this.dialog = true;
    },
      editItem(id){
        this.dialogEdit = true;
        this.selectedId = id;
      },
      edit(id){
        axios.patch("http://localhost:3000/api/v1/facture/" + id, this.bill);
        this.closeEdit();
        this.product.designation = "";
        this.getProduct();
        this.$forceUpdate();
      },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },

    deleteItemConfirm(id) {
      axios.delete("http://localhost:3000/api/v1/facture/" + id);
      this.closeDelete();
      this.getBill();
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
      axios
        .post("http://localhost:3000/api/v1/facture/", this.bill)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
      this.getBill();
      this.$forceUpdate();
    },
  },
  computed:{
    total(){
      return this.bill.listeProduits.reduce((total, item) => total + item.prix, 0)
    },
  }
};
</script>