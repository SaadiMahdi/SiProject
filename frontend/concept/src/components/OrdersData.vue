<template>
  <div>
    <v-data-table
      v-model="selectedRows"
      :headers="headers"
      :items="this.orders"
      sort-by="products"
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
              New Order
            </v-btn>
          </template>
          <v-dialog v-model="dialog" max-width="1000px" height="1300px">
            <v-card>
              <v-card-title>
                <span class="">Add Order</span>
              </v-card-title>
              <v-form action="" method="post" ref="form">
                <v-container fluid>
                  <v-row>
                    <v-col cols="6">
                      <!-- first column content -->
                      <v-select
                        :items="vendors"
                        v-model="order.fournisseur"
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
                            v-model="order.date"
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
                          v-model="order.date"
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
                            @click="$refs.dialog.save(order.date)"
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
                        v-model="order.listeProduits"
                        label="Choose Products"
                        outlined
                        multiple
                        chips
                        return-object
                        item-text="designation"
                        item-value="_id"
                      ></v-select>
                      <v-container
                        v-for="produit in order.listeProduits"
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
                <span class="">Modify Order</span>
              </v-card-title>
              <form action="" method="post">
                <v-container fluid>
                  <v-row>
                    <v-col cols="6">
                      <!-- first column content -->
                      <v-select
                        :items="vendors"
                        v-model="order.fournisseur"
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
                            v-model="order.date"
                            label="Insert Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            outlined
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="order.date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(order.date)"
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
                        v-model="order.listeProduits"
                        label="Choose Products"
                        outlined
                        multiple
                        chips
                        return-object
                        item-text="designation"
                        item-value="_id"
                      ></v-select>
                      <v-container
                        v-for="produit in order.listeProduits"
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
              </form>
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
                >Are you sure you want to delete this Order?</v-card-title
              >
              <v-card-actions class="rounded-xl">
                <v-spacer></v-spacer>
                <v-btn color="primary " text @click="closeDelete">Cancel</v-btn>
                <v-btn
                  color="primary "
                  @click="
                    deleteItemConfirm(selectedId);
                    deleteMany(selectedRows);
                  "
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item._id)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item._id)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <h3 class="secondary--text">No Orders Yet?</h3>
        <p>Add orders here from the vendors you usually get products from</p>
        <v-btn color="primary" @click="InsertItem()"> Add Order </v-btn>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogEdit: false,
    headers: [
      {
        text: "Vendor",
        align: "start",
        sortable: false,
        value: "fournisseur.name",
      },
      { text: "Ordered The", value: "date", type: "date" },
      { text: "Number Of Products", value: "listeProduits.length" },
      { text: "Tracking ID", value: "_id" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    modal: false,
    orders: [],
    vendors: [],
    prod: [],
    selectedRows: [],
    selectedId: null,
    order: {
      listeProduits: [],
      fournisseur: null,
      date: "",
      nbr_products: 0,
      id: 0,
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogEdit(val) {
      val || this.closeEdit();
    },
  },

  mounted() {
    this.getOrder();
    this.getVendor();
    this.getProduct();
    // console.log(this.orders)
  },

  methods: {
    getOrder() {
      axios
        .get("http://localhost:3000/api/v1/bonCommande")
        .then((response) => {
          this.orders = response.data.data.bons;
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("finished getting orders");
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
      axios.patch("http://localhost:3000/api/v1/bonCommande/" + id, this.order);
      this.closeEdit();
      this.order.vendor.name = "";
      this.getOrder();
      this.$forceUpdate();
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },
    deleteItemConfirm(id) {
      if (this.selectedRows.length == 0) {
      console.log(id);
      axios.delete("http://localhost:3000/api/v1/bonCommande/" + id);
      this.closeDelete();
      this.getOrder();
      this.$forceUpdate();
      }
    },

      deleteMany(selectedRows) {
      const ids= selectedRows.map((row) => row._id);
      console.log(ids)
      axios.post("http://localhost:3000/api/v1/bonCommande/deleteMany", ids);
      this.closeDelete();
      this.getOrder();
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
        .post("http://localhost:3000/api/v1/bonCommande/", this.order)
        .then((response) => {
          console.log(response.data);
          this.getOrder();
          this.$refs.form.reset();
          this.$forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
    },
  },
};
</script>