<template>
  <MenuBar />
  <router-view></router-view>
  <div class="container">
    <h1>Invoice Management</h1>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Search Component -->
    <SearchComponent @updateQuery="updateSearchQuery" />

    <button class="btn btn-success" @click="showInvoiceForm = !showInvoiceForm">Add Invoice</button>

    <!-- Invoice Table View -->
    <h2>Invoice List</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="changeSort('ID')">
            ID
            <i :class="getSortIcon('ID')"></i>
          </th>
          <th @click="changeSort('DateTime')">
            DateTime
            <i :class="getSortIcon('DateTime')"></i>
          </th>
          <th @click="changeSort('ProviderName')">
            Provider Name
            <i :class="getSortIcon('ProviderName')"></i>
          </th>
          <th @click="changeSort('Address')">
            Address
            <i :class="getSortIcon('Address')"></i>
          </th>
          <th @click="changeSort('Total')">
            Total
            <i :class="getSortIcon('Total')"></i>
          </th>
          <th @click="changeSort('Paid')">
            Paid
            <i :class="getSortIcon('Paid')"></i>
          </th>
          <th @click="changeSort('Remaining')">
            Remaining
            <i :class="getSortIcon('Remaining')"></i>
          </th>
          <th @click="changeSort('DeliveredBy')">
            Delivered By
            <i :class="getSortIcon('DeliveredBy')"></i>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in sortedInvoices" :key="invoice.ID">
          <td>{{ invoice.ID }}</td>
          <td>{{ invoice.DateTime }}</td>
          <td>{{ invoice.ProviderName }}</td>
          <td>{{ invoice.Address }}</td>
          <td>{{ invoice.Total }}</td>
          <td>{{ invoice.Paid }}</td>
          <td>{{ invoice.Remaining }}</td>
          <td>{{ invoice.DeliveredBy }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editInvoice(invoice.ID)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteInvoice(invoice.ID)">Delete</button><br>
            <button class="btn btn-success btn-sm" @click="toggleInvoiceLine(invoice.ID)">InvoiceLine</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Invoice Form Component -->
    <InvoiceForm v-if="showInvoiceForm" @formSubmitted="handleFormSubmitted" :selectedInvoice="selectedInvoice" @closeForm="showInvoiceForm = false"/>

    <!-- Conditionally Render InvoiceLine Component for Each Invoice -->
    <InvoiceLine v-if="invoiceLineVisibleID !== null" :invoiceID="invoiceLineVisibleID" @close="invoiceLineVisibleID = null" />
  </div>
</template>

<script>

import MenuBar from '../MenuBar.vue';
import { mapState, mapMutations } from 'vuex';
import InvoiceForm from './InvoiceForm.vue';
import InvoiceLine from './InvoiceLine.vue';
import SearchComponent from '../SearchComponent.vue'; // Import the new component
import '@/assets/styles.css'
export default {
  components: {
    InvoiceForm,
    InvoiceLine,
    SearchComponent,
    MenuBar,
  },
  data() {
    return {
      searchQuery: '',
      showInvoiceForm: false,
      selectedInvoice: null,
      sortKey: 'ID',
      sortOrder: 1,
      invoiceLineVisibleID: null,
    };
  },
  computed: {
  ...mapState('invoices', ['invoices']),
  
  filteredInvoices() {
    if (!this.invoices) {
      return []; // Return an empty array if invoices is undefined
    }
    
    if (!this.searchQuery) {
      return this.invoices; // Return the entire array if there's no search query
    }
    
    const lowerCaseQuery = this.searchQuery.toLowerCase();
    return this.invoices.filter(invoice => 
      invoice.ProviderName.toLowerCase().includes(lowerCaseQuery) || 
      invoice.Address.toLowerCase().includes(lowerCaseQuery)
    );
  },
  
  sortedInvoices() {
    // Ensure filteredInvoices is an array and handle potential undefined case
    const invoices = Array.isArray(this.filteredInvoices) ? this.filteredInvoices : [];
    return invoices.slice().sort((a, b) => {
      const modifier = this.sortOrder;
      if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
      if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
      return 0;
    });
  },
},
  methods: {
    ...mapMutations('invoices', ['DELETE_INVOICE']), // Map mutations from the invoices module
    changeSort(key) {
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
    editInvoice(id) {
      this.selectedInvoice = this.invoices.find(inv => inv.ID === id);
      this.showInvoiceForm = true;
    },
    deleteInvoice(id) {
      this.DELETE_INVOICE(id);
    },
    handleFormSubmitted() {
      this.showInvoiceForm = false;
      this.selectedInvoice = null;
    },
    toggleInvoiceLine(id) {
      this.invoiceLineVisibleID = this.invoiceLineVisibleID === id ? null : id;
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
  },
};
</script>
<style >
@import '@/assets/styles.css';

</style>