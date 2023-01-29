<template>
  <div>
    <v-data-table
      v-model="selectedRows"
      :headers="headers"
      :items="this.categories"
      sort-by="products"
      show-select
      item-key="_id"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
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
            New Category
          </v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="">Add Category</span>
              </v-card-title>
              <form action="" method="post">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="category.designation"
                        label="Category"
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
          <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="">Edit Category</span>
              </v-card-title>
              <form action="" method="post">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                        v-model="category.designation"
                        label="Category"
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
        <v-btn color="primary" dark class="mb-2" @click="InsertItem()">
          New Category
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogEdit: false,
    dialogDelete: false,
    headers: [
      {
        text: "Category",
        align: "start",
        sortable: false,
        value: "designation",
      },
      { text: "Added The", value: "date" },
      { text: "Number Of Products", value: "nbr_products" },
      { text: "Tracking ID", value: "_id" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    categories: [],
    selectedId: null,
    selectedRows: [],
    category: {
      designation: "",
      date: 0,
      nbr_products: 0,
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
    this.getCategory();
  },

  methods: {
    getCategory() {
      axios
        .get("http://localhost:3000/api/v1/categorie")
        .then((response) => {
          this.categories = response.data.data.categorie;
          console.log(this.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    InsertItem(item) {
      this.dialog = true;
    },
    editItem(item) {
      this.dialogEdit = true;
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },
    edit(id) {
      axios.patch(
        "http://localhost:3000/api/v1/categorie/" + id,
        this.category
      );
      this.closeEdit();
      this.getCategory();
      this.$forceUpdate();
    },

    deleteItemConfirm(id) {
      if (this.selectedRows.length == 0) {
        console.log(id);
        axios.delete("http://localhost:3000/api/v1/categorie/" + id);
        this.closeDelete();
        this.getCategory();
        this.$forceUpdate();
      }
    },

    deleteMany(selectedRows) {
      const ids = selectedRows.map((row) => row._id);
      console.log(ids);
      axios.post("http://localhost:3000/api/v1/categorie/deleteMany", ids);
      this.closeDelete();
      this.getCategory();
      this.$forceUpdate();
    },
    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },
    editItem(id) {
      this.dialogEdit = true;
      this.selectedId = id;
    },
    closeEdit() {
      this.dialogEdit = false;
    },

    save() {
      axios
        .post("http://localhost:3000/api/v1/categorie/", this.category)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
      this.category.designation = "";
      this.getCategory();
    },
  },
};
</script>