<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow-sm" style="width: 100%; max-width: 400px;">
      <div class="card-body p-4">
        <h1 class="text-center mb-4 custom-header">Signup</h1>
        <form @submit.prevent="signup" class="needs-validation" novalidate>
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              class="form-control custom-input" 
              required 
              minlength="3"
              maxlength="20"
              pattern="^[a-zA-Z0-9_]+$"
            />
            <div v-if="usernameError" class="text-danger">{{ usernameError }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              class="form-control custom-input" 
              required 
              minlength="6"
              maxlength="20"
            />
            <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
          </div>
          <button type="submit" class="btn btn-primary w-100 custom-btn">Signup</button>
          <div>
            <button type="button" @click="signin" class="btn btn-secondary w-100 mt-2 custom-btn">Login,Already have account</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: ''
    }
  },
  methods: {
    validateForm() {
      this.usernameError = '';
      this.passwordError = '';
      
      const usernamePattern = /^[a-zA-Z0-9_]+$/;

      if (!this.username) {
        this.usernameError = 'Username is required.';
      } else if (this.username.length < 3) {
        this.usernameError = 'Username must be at least 3 characters long.';
      } else if (this.username.length > 20) {
        this.usernameError = 'Username must be less than 20 characters long.';
      } else if (!usernamePattern.test(this.username)) {
        this.usernameError = 'Username can only contain letters, numbers, and underscores.';
      }

      if (!this.password) {
        this.passwordError = 'Password is required.';
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters long.';
      } else if (this.password.length > 20) {
        this.passwordError = 'Password must be less than 20 characters long.';
      }

      return !this.usernameError && !this.passwordError;
    },
    signup() {
      if (this.validateForm()) {
        // Dummy signup
        this.$router.push('/InvoiceTable')
      }
    },
    signin(){
      this.$router.push('/')
    }
  }
}
</script>

