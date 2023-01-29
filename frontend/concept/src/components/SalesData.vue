<template>
  <v-data-table
    v-model="selectedRows"
    :headers="headers"
    :items="this.sales"
    sort-by="sales"
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
            New Sale
          </v-btn>
        </template>
        <v-dialog v-model="dialog" max-width="1000px" height="1300px">
          <v-card>
            <v-card-title>
              <span class="">Add Sale</span>
            </v-card-title>
            <v-form action="" method="post" ref="form">
              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <!-- first column content -->
                    <v-select
                      :items="customers"
                      v-model="sale.client"
                      label="Customer"
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
                          v-model="sale.date"
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
                        v-model="sale.date"
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
                          @click="$refs.dialog.save(sale.date)"
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
                      v-model="sale.listeProduits"
                      label="Choose Products"
                      outlined
                      multiple
                      chips
                      return-object
                      item-text="designation"
                      item-value="produit._id"
                    ></v-select>
                    <v-container
                      v-for="produit in sale.listeProduits"
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
              <span class="">Edit Sale</span>
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
                        v-model="sale.date"
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
                      v-model="sale.date"
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
                        @click="$refs.dialog.save(sale.date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-row>
                <v-row>
                  <v-select
                    :items="customers"
                    v-model="sale.client"
                    label="Customer"
                    outlined
                    return-object
                    item-text="name"
                    item-value="_id"
                  ></v-select>
                </v-row>
                <v-row>
                  <v-select
                    :items="prod"
                    v-model="sale.listeProduits"
                    label="Choose Products"
                    outlined
                    multiple
                    chips
                    return-object
                    item-text="designation"
                    item-value="_id"
                  ></v-select>
                  <v-container
                    v-for="produit in sale.listeProduits"
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
              <span class="">Sale Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-container>
                      <p>Sale Number: {{ sale._id }}</p>
                    </v-container>
                  </v-col>
                  <v-col>
                    <v-container>
                      <p>Sale Date: {{ sale.date }}</p>
                    </v-container>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-container>
                      <p>Customer: {{ sale.client.name }}</p>
                    </v-container>
                  </v-col>
                  <v-col>
                    <v-container>
                      <p>Customer Phone: {{ sale.client.phone }}</p>
                    </v-container>
                  </v-col>
                </v-row>
                <v-row>
                  <v-container>
                    <h2>Product Info :</h2>
                    <v-container
                      v-for="produit in sale.listeProduits"
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
                            <p>Price: {{ produit.prixVente }}</p>
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
                            sale.listeProduits.reduce(
                              (total, produit) =>
                                total + produit.quantite * produit.prixVente,
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
      <h3 class="secondary--text">No Sales Yet?</h3>
      <p>Add your newest Sales here</p>
      <v-btn color="primary" @click="InsertItem()"> Add Sale </v-btn>
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
        text: "Customer",
        align: "start",
        sortable: false,
        value: "client.name",
      },
      { text: "Added The", value: "date", type: "date", sortable: true },
      { text: "Tracking id", value: "_id" },
      { text: "Number Of Products", value: "listeProduits.length" },
      { text: "Credit", value: "client.credit" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    total: 0,
    sales: [],
    customers: [],
    prod: [],
    selectedRows: [],
    editedIndex: -1,
    sale: {
      id: 0,
      date: "",
      client: "",
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
    this.getSale();
    this.getCustomer();
    this.getProduct();
  },

  created() {
    this.sales.forEach((sale) => {
      this.getTotal(sale._id);
      console.log(this.getTotal(sale._id));
    });
  },

  methods: {
    printSale(id) {
      this.selectedId = id;
      axios
        .get(`http://localhost:3000/api/v1/transaction/` + id)
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
        .get(`http://localhost:3000/api/v1/transaction/` + id)
        .then((response) => {
          this.sale = response.data.data.tr;
          console.log(this.sale.listeProduits);
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
    getSale() {
      axios
        .get("http://localhost:3000/api/v1/transaction")
        .then((response) => {
          this.sales = response.data.data.tr;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCustomer() {
      axios
        .get("http://localhost:3000/api/v1/client")
        .then((response) => {
          this.customers = response.data.data.client;
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
        .get("http://localhost:3000/api/v1/transaction/transactionTotal/" + id)
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
      axios.patch("http://localhost:3000/api/v1/transaction/" + id, this.sale);
      this.closeEdit();
      this.getSale();
      this.$forceUpdate();
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },

    deleteItemConfirm(id) {
      if (this.selectedRows.length == 0) {
      axios.delete("http://localhost:3000/api/v1/transaction/" + id);
      this.closeDelete();
      this.getSale();
      this.$forceUpdate();
      }
    },

    deleteMany(selectedRows) {
      const ids= selectedRows.map((row) => row._id);
      console.log(ids)
      axios.post("http://localhost:3000/api/v1/transaction/deleteMany", ids);
      this.closeDelete();
      this.getSale();
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
      console.log(this.sale);
      axios
        .post("http://localhost:3000/api/v1/transaction/", this.sale)
        .then((response) => {
          console.log(response.data);
          this.close();
          this.getSale();
          this.$forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
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
