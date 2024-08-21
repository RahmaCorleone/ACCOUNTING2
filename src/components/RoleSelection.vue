<template>
    <div class="role-selection text-center mt-5">
      <h2>Select Your Role</h2>
      <div class="btn-group-vertical mt-4" role="group" aria-label="Role Selection">
        <button class="btn btn-primary mb-2 d-flex align-items-center justify-content-center" @click="selectRole('Admin')">
          <i class="bi bi-shield-lock-fill me-2"></i> Admin
        </button>
        <button class="btn btn-primary mb-2 d-flex align-items-center justify-content-center" @click="selectRole('Chef Accountant')">
          <i class="bi bi-calculator-fill me-2"></i> Chef Accountant
        </button>
        <button class="btn btn-primary d-flex align-items-center justify-content-center" @click="selectRole('Accountant')">
          <i class="bi bi-clipboard-data-fill me-2"></i> Accountant
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RoleSelection',
    methods: {
      selectRole(role) {
        // Store the selected role in local storage
        localStorage.setItem('userRole', role);
        
        // Redirect to the Login page after selecting a role
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style scoped>
  .mt-5 {
    margin-top: 3rem !important;
  }
  
  .mb-2 {
    margin-bottom: 0.5rem !important;
  }
  
  .me-2 {
    margin-right: 0.5rem !important;
  }
  </style>
  