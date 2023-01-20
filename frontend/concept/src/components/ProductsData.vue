<template>
  <v-data-table
    :headers="headers"
    :items="products"
    sort-by="products"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Product
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="editedItem.product"
                    label="Product"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.date"
                    label="Added The"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-select
                    :items="types"
                    label="Product Type"
                    outlined
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
            <v-card-title class="align-center"
              >Are you sure you want to delete this item?</v-card-title
            >
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
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>


<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Product",
        align: "start",
        sortable: false,
        value: "product",
      },
      { text: "Added The", value: "date" },
      { text: "Product Type", value: "type" },
      { text: "Tracking ID", value: "id" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    products: [],
    types:['Test1','Tshirt','This is a test'],
    editedIndex: -1,
    editedItem: {
      product: "",
      date: 0,
      type: 0,
      id: 0,
    },
    defaultItem: {
      product: "",
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.products = [
        {
          product: "Frozen Yogurt",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "Ice cream sandwich",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "Eclair",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "Cupcake",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "Gingerbread",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "Jelly bean",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "Lollipop",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "Honeycomb",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "Donut",
          date: 0,
          type: 0,
          id: 0,
        },
        {
          product: "KitKat",
          date: 0,
          type: 0,
          id: 0,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.products.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>