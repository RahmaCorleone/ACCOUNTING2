<template>
  
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <a class="navbar-brand" href="#">Accounting System</a>
      <span class="navbar-toggler-icon"></span>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/InvoiceTable" exact-active-class="active">Invoices List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ProviderTable" exact-active-class="active">Providers List</router-link>
          </li>
         
        </ul>
        <button class="btn btn-outline-danger my-2 my-sm-0" @click="logout">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #e5e5e5; /* Light border for separation */
}

.navbar-brand {
  font-weight: bold;
  color: #007bff;
}

.navbar-nav .nav-link {
  color: #495057;
  font-size: 1.1rem;
}

.navbar-nav .nav-link:hover {
  color: #007bff;
  background-color: #f8f9fa;
  border-radius: 0.25rem;
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #fff;
}

.active {
  font-weight: bold;
  color: #007bff;
  background-color: #5596d6;
  border-radius: 0.25rem;
}
</style>
