import { createStore } from 'vuex';
import invoices from './modules/invoices';
import providers from './modules/providers';
import '@/assets/styles.css';

const store = createStore({
  modules: {
    invoices,
    providers,
  },
  state: {
    lastInvoiceID: 0,
    selectedProviderName: null,
  },
  mutations: {
    SET_SELECTED_PROVIDER_NAME(state, providerName) {
      state.selectedProviderName = providerName;
    },
  },
  actions: {
    selectProviderName({ commit }, providerName) {
      commit('SET_SELECTED_PROVIDER_NAME', providerName);
    },
  },
  getters: {
    selectedProviderName: state => state.selectedProviderName,
  },
});

export default store;
