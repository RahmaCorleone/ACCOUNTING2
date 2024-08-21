<template>
  <form @submit.prevent="handleSubmitProvider" class="needs-validation" novalidate>
    <h2>Add/Edit Provider</h2>
    <div class="mb-3">
      <label for="providerID" class="form-label">ID (Auto-generated):</label>
      <input id="providerID" v-model="provider.ID" type="text" class="form-control" disabled placeholder="Auto-generated ID" />
    </div>
    <div class="mb-3">
      <label for="providerName" class="form-label">Name:</label>
      <input id="providerName" v-model="provider.Name" type="text" class="form-control" required />
      <div v-if="providerNameError" class="text-danger">{{ providerNameError }}</div>
    </div>
    <div class="mb-3">
      <label for="providerAddress" class="form-label">Address:</label>
      <input id="providerAddress" v-model="provider.Address" type="text" class="form-control" required />
      <div v-if="providerAddressError" class="text-danger">{{ providerAddressError }}</div>
    </div>
    <div class="mb-3">
      <label for="providerPhone" class="form-label">Phone:</label>
      <input id="providerPhone" v-model="provider.Phone" type="text" class="form-control" required />
      <div v-if="providerPhoneError" class="text-danger">{{ providerPhoneError }}</div>
    </div>
    <div class="mb-3">
      <label for="providerService" class="form-label">Service:</label>
      <input id="providerService" v-model="provider.Service" type="text" class="form-control" required />
      <div v-if="providerServiceError" class="text-danger">{{ providerServiceError }}</div>
    </div>
    <div class="mb-3">
      <label for="providerNote" class="form-label">Note:</label>
      <input id="providerNote" v-model="provider.Note" type="text" class="form-control" />
    </div>
    <button type="submit" class="btn btn-primary">Save Provider</button>
    <button type="button" class="btn btn-secondary" @click="resetProviderForm">Cancel</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      provider: {
        ID: '',
        Name: '',
        Address: '',
        Phone: '',
        Service: '',
        Note: '',
      },
      selectedProviderID: null,
      providerNameError: '',
      providerAddressError: '',
      providerPhoneError: '',
      providerServiceError: '',
    };
  },
  methods: {
    ...mapActions('providers', ['addProvider', 'updateProvider']),
    validateInput() {
      this.providerNameError = this.providerAddressError = this.providerPhoneError = this.providerServiceError = '';

      if (!this.provider.Name) {
        this.providerNameError = 'Name is required';
      }
      if (!this.provider.Address) {
        this.providerAddressError = 'Address is required';
      }
      if (!this.provider.Phone) {
        this.providerPhoneError = 'Phone is required';
      }
      if (!this.provider.Service) {
        this.providerServiceError = 'Service is required';
      }

      return !this.providerNameError && !this.providerAddressError && !this.providerPhoneError && !this.providerServiceError;
    },
    handleSubmitProvider() {
      if (this.validateInput()) {
        if (this.selectedProviderID) {
          this.updateProvider(this.provider);
        } else {
          this.addProvider(this.provider);
        }
        this.$emit('provider-saved');
        this.resetProviderForm();
      }
    },
    setProvider(provider) {
      this.provider = { ...provider };
      this.selectedProviderID = provider.ID;
    },
    resetProviderForm() {
      this.provider = {
        ID: '',
        Name: '',
        Address: '',
        Phone: '',
        Service: '',
        Note: '',
      };
      this.selectedProviderID = null;
      this.providerNameError = this.providerAddressError = this.providerPhoneError = this.providerServiceError = '';
    },
  },
};
</script>
