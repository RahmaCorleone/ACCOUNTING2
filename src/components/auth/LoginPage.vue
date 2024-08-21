<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="card shadow-sm" style="width: 100%; max-width: 400px;">
      <div class="card-body p-4">
        <h1 class="text-center mb-4 custom-header">Login</h1>
        <form @submit.prevent="login" class="needs-validation" novalidate>
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input type="text" id="username" v-model="username" class="form-control custom-input" required />
            <div v-if="usernameError" class="text-danger">{{ usernameError }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input type="password" id="password" v-model="password" class="form-control custom-input" required />
            <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
          </div>
          <button type="submit" class="btn btn-primary w-100 custom-btn">Login</button>
          <div>
            <button @click.prevent="Signup" class="btn btn-primary w-100 mt-2 custom-btn">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const users = {
  'Rahma': '1234',
  'user2': 'password2'
};

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
    validateInput() {
      this.usernameError = '';
      this.passwordError = '';

      if (!this.username) {
        this.usernameError = 'Username is required';
      }

      if (!this.password) {
        this.passwordError = 'Password is required';
      }

      if (this.username && this.password && (!users[this.username] || users[this.username] !== this.password)) {
        this.usernameError = 'Invalid username or password';
      }

      return !this.usernameError && !this.passwordError;
    },
    login() {
      if (this.validateInput()) {
        const user = { username: this.username };
        this.$store.dispatch('login', user);
        this.$router.push('/InvoiceTable');
      }
    },
    Signup() {
      this.$router.push('/signup');
    }
  }
}
</script>

