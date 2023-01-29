<template>
  <v-data-table
    v-model="selectedRows"
    :headers="headers"
    :items="this.bills"
    sort-by="bills"
    show-select
    item-key="_id"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <template>
          <v-btn
              v-if="selectedRows.length != 0"
              color="secondary"
              dark
              class="mb-2"
              @click="deleteItem(selectedRows)"
            >
              Delete
            </v-btn>
          <v-btn color="primary" dark class="mb-2" @click="InsertItem()">
            New bill
          </v-btn>
        </template>
        <v-dialog v-model="dialog" max-width="1000px" height="1300px">
          <v-card>
            <v-card-title>
              <span class="">Add bill</span>
            </v-card-title>
            <v-form action="" method="post" ref="form">
              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <!-- first column content -->
                    <v-select
                      :items="vendors"
                      v-model="bill.fournisseur"
                      label="Vendor"
                      outlined
                      return-object
                      item-text="name"
                      item-value="_id"
                    ></v-select>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="bill.date"
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
                        v-model="bill.date"
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
                          @click="$refs.dialog.save(bill.date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="6" class="d-flex flex-column">
                    <h3 class="mb-3">Items</h3>
                    <v-select
                      :items="prod"
                      v-model="bill.listeProduits"
                      label="Choose Products"
                      outlined
                      multiple
                      chips
                      return-object
                      item-text="designation"
                      item-value="produit._id"
                    ></v-select>
                    <v-container
                      v-for="produit in bill.listeProduits"
                      :key="produit._id"
                    >
                      <v-row>
                        <v-col>
                          <v-container>
                            <h3>{{ produit?.designation }}</h3>
                            <p class="grey--text">
                              {{ produit.categorie?.designation }}
                            </p>
                          </v-container>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="produit.quantite"
                            type="number"
                            label="Quantity"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="produit.prixAchat"
                            type="number"
                            label="Bought price"
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="produit.prixVente"
                            type="number"
                            label="Sold price"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
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
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="bill.date"
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
                      v-model="bill.date"
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
                        @click="$refs.dialog.save(bill.date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-row>
                <v-row>
                  <v-select
                    :items="vendors"
                    v-model="bill.fournisseur"
                    label="fournisseur"
                    outlined
                    return-object
                    item-text="name"
                    item-value="_id"
                  ></v-select>
                </v-row>
                <v-row>
                  <v-select
                    :items="prod"
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
                    :key="produit._id"
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
            <v-card-title class="align-center"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions class="rounded-xl">
              <v-spacer></v-spacer>
              <v-btn color="primary " text @click="closeDelete">Cancel</v-btn>
              <v-btn color="primary " @click="deleteItemConfirm(selectedId); deleteMany(selectedRows);"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDetails" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="">Bill Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-container>
                      <p>Bill Number: {{ bill._id }}</p>
                    </v-container>
                  </v-col>
                  <v-col>
                    <v-container>
                      <p>Bill Date: {{ bill.date }}</p>
                    </v-container>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-container>
                      <p>Vendor: {{ bill.fournisseur.name }}</p>
                    </v-container>
                  </v-col>
                  <v-col>
                    <v-container>
                      <p>Vendor Phone: {{ bill.fournisseur.phone }}</p>
                    </v-container>
                  </v-col>
                </v-row>
                <v-row>
                  <v-container>
                    <h2>Produit Info :</h2>
                    <v-container
                      v-for="produit in bill.listeProduits"
                      :key="produit._id"
                    >
                      <v-row>
                        <v-col>
                          <v-container>
                            <p>ProductID: {{ produit._id }}</p>
                          </v-container>
                        </v-col>

                        <v-col>
                          <v-container>
                            <p>Quantity: {{ produit.quantite }}</p>
                          </v-container>
                        </v-col>
                        <v-col>
                          <v-container>
                            <p>Price: {{ produit.prixAchat }}</p>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-container>
                    <hr />

                    <v-container>
                      <v-col>
                        <p class="total">
                          Total:
                          {{
                            bill.listeProduits.reduce(
                              (total, produit) =>
                                total + produit.quantite * produit.prixAchat,
                              0
                            )
                          }}
                        </p>
                      </v-col>
                    </v-container>
                  </v-container>
                </v-row>
                <v-btn color="primary" text> Print </v-btn>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="editItem(item._id)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item._id)"> mdi-delete </v-icon>
      <v-icon small @click="showDetails(item._id)">mdi-eye</v-icon>
    </template>
    <template v-slot:no-data>
      <h3 class="secondary--text">No Bills Yet?</h3>
      <p>Add your newest Bills here</p>
      <v-btn color="primary" @click="InsertItem()"> Add Bill </v-btn>
    </template>
  </v-data-table>
</template>


<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    dialogDetails: false,
    selectedId: null,
    modal: false,
    headers: [
      {
        text: "Vendor",
        align: "start",
        sortable: false,
        value: "fournisseur.name",
      },
      { text: "Added The", value: "date", type: "date", sortable: true },
      { text: "Tracking id", value: "_id" },
      { text: "Number Of Products", value: "listeProduits.length" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    total: 0,
    bills: [],
    vendors: [],
    prod: [],
    selectedRows: [],
    editedIndex: -1,
    bill: {
      id: 0,
      date: "",
      fournisseur: "",
      listeProduits: [],
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

  mounted() {
    this.getBill();
    this.getVendor();
    this.getProduct();
  },

  created() {
    this.bills.forEach((bill) => {
      this.getTotal(bill._id);
      console.log(this.getTotal(bill._id));
    });
  },

  methods: {
    printBill(id) {
      this.selectedId = id;
      axios
        .get(`http://localhost:3000/api/v1/facture/` + id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showDetails(id) {
      this.dialogDetails = true;
      this.selectedId = id;
      axios
        .get(`http://localhost:3000/api/v1/facture/` + id)
        .then((response) => {
          this.bill = response.data.data.facture;
          console.log(this.bill.listeProduits);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // getOneProduct(id){
    //   axios.get(`http://localhost:3000/api/v1/produit/` + id)
    //     .then((response) => {
    //       const produit = response.data.data.produit;
    //       console.log(produit.designation);
    //       return produit.designation;
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
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
      axios
        .get("http://localhost:3000/api/v1/fournisseur")
        .then((response) => {
          this.vendors = response.data.data.fournisseurs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProduct() {
      axios
        .get("http://localhost:3000/api/v1/produit")
        .then((response) => {
          this.prod = response.data.data.produits;
          console.log(this.prod);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTotal(id) {
      axios
        .get("http://localhost:3000/api/v1/facture/factureTotal/" + id)
        .then((response) => {
          this.bill.totalAmount = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    InsertItem(item) {
      this.dialog = true;
    },
    editItem(id) {
      this.dialogEdit = true;
      this.selectedId = id;
    },
    edit(id) {
      axios.patch("http://localhost:3000/api/v1/facture/" + id, this.bill);
      this.closeEdit();
      this.getProduct();
      this.$forceUpdate();
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },

    deleteItemConfirm(id) {
      if (this.selectedRows.length == 0) {
      axios.delete("http://localhost:3000/api/v1/facture/" + id);
      this.closeDelete();
      this.getBill();
      this.$forceUpdate();
      }
    },

    deleteMany(selectedRows) {
      const ids= selectedRows.map((row) => row._id);
      console.log(ids)
      axios.post("http://localhost:3000/api/v1/facture/deleteMany", ids);
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
      console.log(this.bill);
      axios
        .post("http://localhost:3000/api/v1/facture/", this.bill)
        .then((response) => {
          console.log(response.data);
          this.getBill();
          this.$forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
      this.getBill();
      this.$forceUpdate();
    },
  },
};
</script>


<style>
.total {
  font-weight: bold;
  font-size: 1.2em;
  color: #000;
  display: flex;
  justify-content: flex-end;
  margin-right: 180px;
}
</style>
