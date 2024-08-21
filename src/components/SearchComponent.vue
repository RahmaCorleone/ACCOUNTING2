<template>
    <div class="mb-3">
      <label for="search" class="form-label">Search Invoices:</label>
      <input id="search" v-model="query" type="text" class="form-control" placeholder="Search by Provider Name or Address" @input="emitQuery" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: '',
      };
    },
    methods: {
      emitQuery() {
        this.$emit('updateQuery', this.query);
      },
    },
  };
  </script>
  