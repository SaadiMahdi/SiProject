<template>
  <v-data-table
    :headers="headers"
    :items="types"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Product Type
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
                    v-model="editedItem.type"
                    label="Type"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.id"
                    label="Id"
                    outlined
                    disabled
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.nbr_products"
                    label="Products"
                    outlined
                    disabled
                  ></v-text-field>
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
        text: "Type",
        align: "start",
        sortable: false,
        value: "type",
      },
      { text: "Tracking ID", value: "id" },
      { text: "Product w/ This type", value: "nbr_products" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    types: [],
    editedIndex: -1,
    editedItem: {
      type: "",
      id: 0,
      nbr_products: 0,
    },
    defaultItem: {
      type: "",
      id: 0,
      nbr_products: 0,
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
      this.types = [
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
        {
          type: "Frozen Yogurt",
          id: 159,
          nbr_products: 6.0,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.types.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.types.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.types.splice(this.editedIndex, 1);
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
        Object.assign(this.types[this.editedIndex], this.editedItem);
      } else {
        this.types.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>