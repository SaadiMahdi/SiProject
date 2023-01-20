<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="prod.data.produits"
      sort-by="products"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <template>
            <v-btn color="primary" dark class="mb-2" @click="editItem()">
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
                      <v-text-field
                        v-model="product.designation"
                        label="Product"
                        outlined
                      ></v-text-field>
                    </v-row>
                    <!-- <v-row>
                  <v-text-field
                    v-model="product.date"
                    label="Added The"
                    outlined
                  ></v-text-field>
                </v-row> -->
                    <!-- <v-row>
                  <v-select
                    :items="categories.data.categorie"
                    label="Product Type"
                    outlined
                  ></v-select>
                </v-row> -->
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="align-center"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions class="rounded-xl">
                <v-spacer></v-spacer>
                <v-btn color="primary " text @click="closeDelete">Cancel</v-btn>
                <v-btn color="primary " @click="deleteItemConfirm(selectedId)"
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
        <v-icon small @click="deleteItem(item._id)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <h3 class="secondary--text">No Products Yet?</h3>
        <p>Add products to your store and start selling to see products here</p>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
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
    headers: [
      {
        text: "Product",
        align: "start",
        sortable: false,
        value: "designation",
      },
      { text: "Added The", value: "date" },
      { text: "Product Type", value: "categorie.designation" },
      { text: "Tracking ID", value: "_id" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    prod: [],
    categories: [],
    selectedId: null,
    product: {
      designation: "",
      date: 0,
      type: 0,
      id: 0,
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
    this.getProduct();
    axios
      .get("http://localhost:3000/api/v1/categorie")
      .then((response) => {
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    getProduct() {
      axios
        .get("http://localhost:3000/api/v1/produit")
        .then((response) => {
          this.prod = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editItem(item) {
      this.dialog = true;
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },

    deleteItemConfirm(id) {
      console.log(id);
      axios.delete("http://localhost:3000/api/v1/produit/" + id);
      this.closeDelete();
      this.getProduct();
      this.$forceUpdate();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      axios
        .post("http://localhost:3000/api/v1/produit/", this.product)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
      this.product.designation = "";
      this.getProduct();
      this.$forceUpdate();
    },
  },
};
</script>