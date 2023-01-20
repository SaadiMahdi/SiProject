
<template>
  <v-data-table
    :headers="headers"
    :items="vendors"
    sort-by="vendors"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Vendor
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
                    v-model="editedItem.vendor"
                    label="Vendor"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.email"
                    label="Email"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.phone"
                    label="Phone"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="editedItem.orders"
                    label="Orders"
                    outlined
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
        text: "Vendor Name",
        align: "start",
        sortable: false,
        value: "vendor",
      },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Orders", value: "orders" },
      { text: "Action", value: "actions", sortable: false },
    ],
    vendors: [],
    editedIndex: -1,
    editedItem: {
      vendor: "",
      email: 0,
      phone: 0,
      orders: 0,
    },
    defaultItem: {
      vendor: "",
      email: 0,
      phone: 0,
      orders: 0,
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
      this.vendors = [
        {
          vendor: "Frozen Yogurt",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "Ice cream sandwich",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "Eclair",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "Cupcake",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "Gingerbread",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "Jelly bean",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "Lollipop",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "Honeycomb",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "Donut",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
        {
          vendor: "KitKat",
          email: 159,
          phone: 6.0,
          orders: 24,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.vendors.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.vendors.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.vendors.splice(this.editedIndex, 1);
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
        this.vendors.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>