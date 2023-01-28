<template>
  <div>
    <v-data-table
      v-model="selectedRows"
      :headers="headers"
      :items="this.stock"
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
              New Product
            </v-btn>
          </template>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="">Add product</span>
              </v-card-title>
              <form action="" method="post">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-select
                        :items="produits"
                        v-model="productInStock.produit"
                        label="Product Name"
                        outlined
                        return-object
                        item-text="designation"
                        item-value="_id"
                      ></v-select>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="productInStock.prixVente"
                        label="Sale Price"
                        outlined
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="productInStock.prixAchat"
                        label="Bought at"
                        outlined
                        disabled
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="productInStock.quantite"
                        label="Quanity"
                        outlined
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-card-text>
              </form>
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
                <span class="">Modify product</span>
              </v-card-title>
              <form action="" method="post">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-select
                        :items="produits"
                        v-model="productInStock.produit"
                        label="Product Name"
                        outlined
                        return-object
                        item-text="designation"
                        item-value="_id"
                      ></v-select>
                    </v-row>
                    <!-- <v-row>
                  <v-text-field
                    v-model="product.date"
                    label="Added The"
                    outlined
                  ></v-text-field>
                </v-row> -->
                    <v-row>
                      <v-text-field
                        v-model="productInStock.prixVente"
                        label="Sale Price"
                        outlined
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="productInStock.prixAchat"
                        label="Bought at"
                        outlined
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="productInStock.quantite"
                        label="Quanity"
                        outlined
                      ></v-text-field>
                    </v-row>
                  </v-container>
                </v-card-text>
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
                >Are you sure you want to delete this item?</v-card-title
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
        <h3 class="secondary--text">No Products Yet?</h3>
        <p>Add products to your store and start selling to see products here</p>
        <v-btn color="primary" @click="InsertItem()"> Add Product </v-btn>
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
    selectedRows: [],
    headers: [
      {
        text: "Product",
        align: "start",
        sortable: false,
        value: "produit.designation",
      },
      { text: "Sale Price", value: "prixVente" },
      { text: "Bought at", value: "prixAchat" },
      { text: "Quantity", value: "quantite" },
      { text: "Tracking ID", value: "_id" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    stock: [],
    produits: [],
    selectedId: null,
    productInStock: {
      produit: null,
      prixVente: 0,
      prixAchat: 0,
      quantite: 0,
    },
  }),

  computed: {},

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
    this.getStock();
    this.getProduit();
  },

  methods: {
    getStock() {
      axios
        .get("http://localhost:3000/api/v1/produitEnStock")
        .then((response) => {
          console.log(response);
          this.stock = response.data.data.produits;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProduit() {
      axios
        .get("http://localhost:3000/api/v1/produit")
        .then((response) => {
          this.produits = response.data.data.produits;
          console.log(response);
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
      axios.patch(
        "http://localhost:3000/api/v1/produitEnStock/" + id,
        this.productInStock
      );
      this.closeEdit();
      this.getStock();
      this.$forceUpdate();
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },
    deleteItemConfirm(id) {
      if (this.selectedRows.length == 0) {
        console.log(id);
        axios.delete("http://localhost:3000/api/v1/produitEnStock/" + id);
        this.closeDelete();
        this.getStock();
        this.$forceUpdate();
      }
    },
    deleteMany(selectedRows) {
      const ids= selectedRows.map((row) => row._id);
      console.log(ids)
      axios.post("http://localhost:3000/api/v1/produitEnStock/deleteMany", ids);
      this.closeDelete();
      this.getStock();
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
      console.log(this.productInStock);
      axios
        .post(
          "http://localhost:3000/api/v1/produitEnStock/",
          this.productInStock
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
      this.getStock();
      this.$forceUpdate();
    },
  },
};
</script>