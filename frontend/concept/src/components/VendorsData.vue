<template>
  <v-data-table
    v-model="selectedRows"
    :headers="headers"
    show-select
    item-key="_id"
    :items="this.vendors"
    sort-by="vendors"
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
          <v-btn color="primary" class="mb-2" @click="InsertItem()">
            Add Vendor
          </v-btn>
        </template>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="">Add Vendor</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="vendor.name"
                    label="Vendor"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="vendor.address"
                    label="Address"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="vendor.phone"
                    label="Phone"
                    outlined
                  ></v-text-field>
                </v-row>
                <!-- <v-row>
                  <v-text-field
                    v-model="vendor.orders"
                    label="Orders"
                    outlined
                  ></v-text-field>
                </v-row> -->
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
              <span class="">Modify vendor</span>
            </v-card-title>
            <form action="" method="post">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="vendor.name"
                      label="Vendor"
                      outlined
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="vendor.address"
                      label="Adress"
                      outlined
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="vendor.phone"
                      label="Phone"
                      outlined
                    ></v-text-field>
                  </v-row>
                  <!-- <v-row>
                  <v-text-field
                    v-model="vendor.orders"
                    label="Orders"
                    outlined
                  ></v-text-field>
                </v-row> -->
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
      <h3 class="secondary--text">No Vendors Yet?</h3>
      <p>Add Vendors to your database</p>
      <v-btn color="primary" @click="InsertItem()"> Add Vendor </v-btn>
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
    headers: [
      {
        text: "Vendor Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Address", value: "address" },
      { text: "Phone", value: "phone" },
      { text: "Orders", value: "orders" },
      { text: "Action", value: "actions", sortable: false },
    ],
    selectedRows: [],
    vendors: [],
    selectedId: null,
    vendor: {
      name: "",
      address: "",
      phone: 0,
      orders: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.vendor === -1 ? "New Item" : "Edit Item";
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
    this.getVendor();
  },

  methods: {
    getVendor() {
      axios
        .get("http://localhost:3000/api/v1/fournisseur")
        .then((response) => {
          this.vendors = response.data.data.fournisseurs;
        })
        .catch((error) => {
          console.log(error);
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
        "http://localhost:3000/api/v1/fournisseur/" + id,
        this.vendor
      );
      this.closeEdit();
      this.getVendor();
      this.$forceUpdate();
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },

    deleteItemConfirm(id) {
      if (this.selectedRows.length == 0) {
        axios.delete("http://localhost:3000/api/v1/fournisseur/" + id);
        this.closeDelete();
        this.getVendor();
        this.$forceUpdate();
      }
    },
    deleteMany(selectedRows) {
      const ids = selectedRows.map((row) => row._id);
      console.log(ids);
      axios.post("http://localhost:3000/api/v1/fournisseur/deleteMany", ids);
      this.closeDelete();
      this.getVendor();
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
        .post("http://localhost:3000/api/v1/fournisseur", this.vendor)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
      this.getVendor();
      this.$forceUpdate();
    },
  },
};
</script>