<template>
  <v-data-table
    v-model="selectedRows"
    :headers="headers"
    :items="customers"
    sort-by="customers"
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
            <v-btn color="primary" dark class="mb-2" @click="InsertItem()"> New Customer </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="">Add Customer</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="customer.name"
                    label="Customer"
                    outlined
                  ></v-text-field>
                </v-row>
                <!-- <v-row>
                  <v-text-field
                    v-model="customer.date"
                    label="Added the"
                    outlined
                    disabled
                  ></v-text-field>
                </v-row> -->
                <v-row>
                  <v-text-field
                    v-model="customer.address"
                    label="Address"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="customer.phone"
                    label="Phone"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="customer.credit"
                    label="Credit"
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
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="">Modify customer</span>
            </v-card-title>
            <form action="" method="post">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="customer.name"
                      label="customer"
                      outlined
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="customer.address"
                      label="Adress"
                      outlined
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="customer.phone"
                      label="Phone"
                      outlined
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="customer.credit"
                      label="credit"
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
              <v-btn color="primary " @click="deleteItemConfirm(selectedId); deleteMany(selectedRows);"
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
      <h3 class="secondary--text">No Customers Yet?</h3>
      <p>That's sad, lonely store..</p>
      <v-btn color="primary" @click="InsertItem()"> Add Customer </v-btn>
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
    selectedId: null,
    headers: [
      {
        text: "Customers",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Address", value: "address" },
      { text: "Phone", value: "phone" },
      { text: "Credit", value: "credit" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    customers: [],
    selectedRows:[],
    editedIndex: -1,
    customer: {
      name: "",
      address: "",
      phone: 0,
      credit: 0,
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
    this.getCustomer();
  },

  methods: {
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

    InsertItem(item) {
      this.dialog = true;
    },

    editItem(id) {
      this.dialogEdit = true;
      this.selectedId = id;
    },

    edit(id) {
      axios.patch("http://localhost:3000/api/v1/client/" + id, this.customer);
      this.closeEdit();
      this.getCustomer();
      this.$forceUpdate();
    },

    deleteItem(id) {
      this.dialogDelete = true;
      this.selectedId = id;
    },

    deleteItemConfirm(id) {
      if (this.selectedRows.length == 0) {
      axios.delete("http://localhost:3000/api/v1/client/" + id);
      this.closeDelete();
      this.getCustomer();
      this.$forceUpdate();
      }
    },

    deleteMany(selectedRows) {
      const ids= selectedRows.map((row) => row._id);
      console.log(ids)
      axios.post("http://localhost:3000/api/v1/client/deleteMany", ids);
      this.closeDelete();
      this.getCustomer();
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
        .post("http://localhost:3000/api/v1/client", this.customer)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.close();
      this.getCustomer();
      this.$forceUpdate();
    },
  },
};
</script>