<template>
  <div>
    <select v-model="localSelectedProvider" @change="emitSelectedProvider" :class="['provider-select', inputClass]">
      <option :value="localSelectedProvider">{{ placeholderText }}</option>
      <option v-for="provider in providers" :key="provider.ID" :value="provider.Name">
        {{ provider.Name }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProviderSelect',
  props: {
    inputClass: {
      type: String,
      default: ''
    },
    selectedProvider: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localSelectedProvider: this.selectedProvider
    };
  },
  computed: {
    ...mapState('providers',['providers']),
    placeholderText() {
      return this.localSelectedProvider ? this.localSelectedProvider : '-- Select Provider --';
    }
  },
  methods: {
    emitSelectedProvider() {
      this.$emit('provider-selected', this.localSelectedProvider);
    },
  },
  watch: {
    selectedProvider(newVal) {
      this.localSelectedProvider = newVal;
    }
  }
};
</script>

<style scoped>
.provider-select {
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
  background-color: #fff;
  transition: border-color 0.3s;
}

.provider-select:focus {
  border-color: #007BFF;
  outline: none;
}

.provider-select option {
  padding: 10px;
  background-color: #fff;
}
</style>
