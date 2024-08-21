<template>
  <MenuBar />
  <router-view></router-view>
  <div class="container">
    <h1>Provider Management</h1>
    
    <SearchComponent @updateQuery="updateSearchQuery" />

    <h2>Provider List</h2>
    <button class="btn btn-primary mb-3" @click="toggleForm">Add Provider</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="sortProviders('ID')">
            ID <i :class="getSortIcon('ID')"></i>
          </th>
          <th @click="sortProviders('Name')">
            Name <i :class="getSortIcon('Name')"></i>
          </th>
          <th @click="sortProviders('Address')">
            Address <i :class="getSortIcon('Address')"></i>
          </th>
          <th @click="sortProviders('Phone')">
            Phone <i :class="getSortIcon('Phone')"></i>
          </th>
          <th @click="sortProviders('Service')">
            Service <i :class="getSortIcon('Service')"></i>
          </th>
          <th @click="sortProviders('Note')">
            Note <i :class="getSortIcon('Note')"></i>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="provider in sortedProviders" :key="provider.ID">
          <td>{{ provider.ID }}</td>
          <td>{{ provider.Name }}</td>
          <td>{{ provider.Address }}</td>
          <td>{{ provider.Phone }}</td>
          <td>{{ provider.Service }}</td>
          <td>{{ provider.Note }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editProvider(provider.ID)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteProvider(provider.ID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ProviderForm v-if="showForm" ref="providerForm" @provider-saved="handleProviderSaved" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProviderForm from './ProviderForm.vue';
import SearchComponent from '../SearchComponent.vue';
import MenuBar from '../MenuBar.vue';
import '@/assets/styles.css';
export default {
  components: {
    ProviderForm,
    SearchComponent,
    MenuBar,
  },
  data() {
    return {
      showForm: false,
      searchQuery: '',
      sortColumn: 'ID',
      sortOrder: 'asc',
    };
  },
  computed: {
    ...mapState('providers', ['providers']),
    filteredProviders() {
      if (!this.searchQuery) {
        return this.providers;
      }
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      return this.providers.filter(provider => 
        provider.Name.toLowerCase().includes(lowerCaseQuery) ||
        provider.Address.toLowerCase().includes(lowerCaseQuery) ||
        provider.Phone.toLowerCase().includes(lowerCaseQuery) ||
        provider.Service.toLowerCase().includes(lowerCaseQuery) ||
        provider.Note.toLowerCase().includes(lowerCaseQuery)
      );
    },
    sortedProviders() {
      const providers = Array.isArray(this.filteredProviders) ? this.filteredProviders : [];
    return providers.slice().sort((a, b) => {
      const modifier = this.sortOrder;
      if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
      if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
      return 0;
    });
    },
  },
  methods: {
    ...mapActions('providers', ['deleteProvider']),
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm && this.$refs.providerForm) {
        this.$refs.providerForm.resetProviderForm();
      }
    },
    editProvider(id) {
      const provider = this.providers.find(pro => pro.ID === id);
      if (provider) {
        this.showForm = true;
        this.$nextTick(() => {
          if (this.$refs.providerForm) {
            this.$refs.providerForm.setProvider(provider);
          }
        });
      }
    },
    handleProviderSaved() {
      this.showForm = false;
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
    sortProviders(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortOrder = 'asc';
      }
    },
    getSortIcon(key) {
      if (this.sortColumn !== key) return 'fas fa-sort';
      return this.sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
    },
  },
};
</script>
<style scoped>
@import "@/assets/styles.css";

</style>