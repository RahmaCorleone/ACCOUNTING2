<template>
  <div class="container">
    <h1>Invoice Line Management</h1>

    <!-- Search Input -->
    <div class="mb-3">
      <label for="search" class="form-label">Search Invoice Lines:</label>
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search by Product Name, Invoice ID, etc."
      />
    </div>

    <!-- Add Invoice Line Button -->
    <div class="mb-3">
      <button class="btn btn-primary" @click="addNewInvoiceLine">Add Invoice Line</button>
    </div>

    <!-- Invoice Line Table View -->
    <h2>Invoice Line List</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="sort('productName')">
            Product Name <i :class="getSortIcon('productName')"></i>
          </th>
          <th @click="sort('quantity')">
            Quantity <i :class="getSortIcon('quantity')"></i>
          </th>
          <th @click="sort('price')">
            Price <i :class="getSortIcon('price')"></i>
          </th>
          <th @click="sort('value')">
            Value <i :class="getSortIcon('value')"></i>
          </th>
          <th @click="sort('invoiceID')">
            Invoice ID <i :class="getSortIcon('invoiceID')"></i>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in sortedAndFilteredInvoiceLines" :key="line.id">
          <td v-if="editedLineId === line.id || newLine.id === line.id">
            <input v-model="editableInvoiceLine.productName" type="text" class="form-control" />
          </td>
          <td v-else>{{ line.productName }}</td>

          <td v-if="editedLineId === line.id || newLine.id === line.id">
            <input v-model="editableInvoiceLine.quantity" type="number" class="form-control" />
          </td>
          <td v-else>{{ line.quantity }}</td>

          <td v-if="editedLineId === line.id || newLine.id === line.id">
            <input v-model="editableInvoiceLine.price" type="number" class="form-control" />
          </td>
          <td v-else>{{ line.price }}</td>

          <td>{{ line.quantity * line.price }}</td>

          <td v-if="editedLineId === line.id || newLine.id === line.id">
            <input v-model="editableInvoiceLine.invoiceID" type="text" class="form-control" />
          </td>
          <td v-else>{{ line.invoiceID }}</td>

          <td>
            <button
              v-if="editedLineId === line.id"
              class="btn btn-success btn-sm"
              @click="saveInvoiceLine(line.id)"
            >
              Save
            </button>
            <button
              v-else-if="newLine.id === line.id"
              class="btn btn-success btn-sm"
              @click="saveNewInvoiceLine"
            >
              Save
            </button>
            <button
              v-else
              class="btn btn-primary btn-sm"
              @click="editInvoiceLine(line.id)"
            >
              Edit
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteInvoiceLine(line.id)">
              Delete
            </button>
            <button
              v-if="editedLineId === line.id || newLine.id === line.id"
              class="btn btn-secondary btn-sm"
              @click="cancelEdit"
            >
              Cancel
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import '@/assets/styles.css';

export default {
  data() {
    return {
      invoiceLines: [
        { id: 1, productName: 'Product A', quantity: 10, price: 5, invoiceID: 'INV-001' },
        { id: 2, productName: 'Product B', quantity: 2, price: 15, invoiceID: 'INV-002' },
        // Add more lines as needed
      ],
      editableInvoiceLine: {
        productName: '',
        quantity: 0,
        price: 0,
        invoiceID: '',
      },
      editedLineId: null,
      searchQuery: '',
      newLine: {
        id: null,
      },
      sortKey: '',
      sortOrder: 1,
    };
  },
  computed: {
    sortedAndFilteredInvoiceLines() {
      let filteredLines = this.filteredInvoiceLines;

      if (this.sortKey) {
        filteredLines = filteredLines.slice().sort((a, b) => {
          let result = 0;
          if (a[this.sortKey] < b[this.sortKey]) result = -1;
          if (a[this.sortKey] > b[this.sortKey]) result = 1;
          return result * this.sortOrder;
        });
      }

      return filteredLines;
    },
    filteredInvoiceLines() {
      if (!this.searchQuery) {
        return this.invoiceLines;
      }
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      return this.invoiceLines.filter(
        (line) =>
          line.productName.toLowerCase().includes(lowerCaseQuery) ||
          line.invoiceID.toLowerCase().includes(lowerCaseQuery)
      );
    },
  },
  methods: {
    editInvoiceLine(id) {
      const line = this.invoiceLines.find((l) => l.id === id);
      if (line) {
        this.editableInvoiceLine = { ...line };
        this.editedLineId = id;
      }
    },
    saveInvoiceLine(id) {
      const index = this.invoiceLines.findIndex((line) => line.id === id);
      if (index !== -1) {
        this.editableInvoiceLine.value =
          this.editableInvoiceLine.quantity * this.editableInvoiceLine.price;
        this.invoiceLines[index] = { id, ...this.editableInvoiceLine };
      }
      this.cancelEdit();
    },
    deleteInvoiceLine(id) {
      this.invoiceLines = this.invoiceLines.filter((line) => line.id !== id);
    },
    cancelEdit() {
      this.editableInvoiceLine = {
        productName: '',
        quantity: 0,
        price: 0,
        invoiceID: '',
      };
      this.editedLineId = null;
      this.newLine.id = null;
    },
    addNewInvoiceLine() {
      this.newLine.id = Date.now();
      this.invoiceLines.push({
        ...this.newLine,
        productName: '',
        quantity: 0,
        price: 0,
        invoiceID: '',
      });
      this.editableInvoiceLine = {
        productName: '',
        quantity: 0,
        price: 0,
        invoiceID: '',
      };
    },
    saveNewInvoiceLine() {
      const index = this.invoiceLines.findIndex((line) => line.id === this.newLine.id);
      if (index !== -1) {
        this.invoiceLines[index] = { ...this.editableInvoiceLine, id: this.newLine.id };
      }
      this.cancelEdit();
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    getSortIcon(key) {
      if (this.sortKey !== key) return 'fas fa-sort';
      return this.sortOrder === 1 ? 'fas fa-sort-up' : 'fas fa-sort-down';
    },
  },
};
</script>
